from flask import request, render_template
from flask_jwt_extended import create_access_token, decode_token
from database.models import User
from flask_restful import Resource
import datetime
import os
from resources.errors import SchemaValidationError, InternalServerError, \
    EmailDoesnotExistsError, BadTokenError
from jwt.exceptions import ExpiredSignatureError, DecodeError, \
    InvalidTokenError
from services.mail_service import send_email

class ForgotPassword(Resource):
    def post(self):
        # url = request.host_url + 'reset'
        try:
            body = request.get_json()
            email = body.get('email')
            if not email:
                raise SchemaValidationError

            user = None
            try:
                user = User.objects.get(email=email)
            except:
                return {"Error": "A user with that email does not exist"}, 400
            if not user:
                return {"Error": "A user with that email does not exist"}, 400

            expires = datetime.timedelta(hours=24)
            reset_token = create_access_token(str(user.id), expires_delta=expires)

            url_append = os.environ.get("FRONTEND_URL") + "/reset?reset_token=" + reset_token

            return send_email('Amplyst - Reset Your Password',
                              sender='support@amplyst.com',
                              recipients=[user.email],
                              text_body=render_template('email/reset_password.txt',
                                                        url=url_append),
                              html_body=render_template('email/reset_password.html',
                                                        url=url_append))
        except SchemaValidationError:
            raise SchemaValidationError
        except EmailDoesnotExistsError:
            raise EmailDoesnotExistsError
        except Exception as e:
            raise InternalServerError


class ResetPassword(Resource):
    def post(self):
        url = request.host_url + 'reset/'
        try:
            body = request.get_json()
            reset_token = body.get('reset_token')
            password = body.get('password')

            if not reset_token or not password:
                raise SchemaValidationError

            user_id = decode_token(reset_token)['sub']

            user = User.objects.get(id=user_id)

            user.modify(password=password)
            user.hash_password()
            user.save()

            return send_email('Amplyst - Password reset successful',
                              sender='support@amplyst.com',
                              recipients=[user.email],
                              text_body='Password reset was successful',
                              html_body='<p>Password reset was successful</p>')

        except SchemaValidationError:
            raise SchemaValidationError
        except ExpiredSignatureError:
            raise ExpiredTokenError
        except (DecodeError, InvalidTokenError):
            return {"Error": "Invalid reset token"}, 400
        except Exception as e:
            raise InternalServerError