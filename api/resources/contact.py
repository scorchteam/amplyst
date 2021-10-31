from flask import Response, request, jsonify, render_template
from flask_mail import Message
from services.extensions import mail
from flask_restful import Resource
from services.mail_service import send_email


class ContactApi(Resource):
    def post(self):
        try:
            body = request.get_json()
            
            #Grab body props
            if(not ("first_name" in body and "email" in body and "subject" in body and "more_information" in body)):
                return {"Error": "Invalid request body schema"}, 400

            first_name = body.get('first_name')
            last_name = None
            if "last_name" in body:
                last_name = body.get('last_name')
            email =  body.get('email')
            subject = body.get('subject')
            more_information = body.get('more_information')

            send_email(
                subject,
                sender="support@amplyst.com",
                recipients=['support@amplyst.com'],
                text_body=render_template('contact/contact_us_to_amplyst.txt', first_name=first_name, last_name=last_name, email=email, subject=subject, more_information=more_information),
                html_body=render_template('contact/contact_us_to_amplyst.html', first_name=first_name, last_name=last_name, email=email, subject=subject, more_information=more_information)
            )

            return send_email(
                subject,
                sender="support@amplyst.com",
                recipients=[email],
                text_body=render_template('contact/contact_us_to_user.txt', first_name=first_name, last_name=last_name, email=email, subject=subject, more_information=more_information),
                html_body=render_template('contact/contact_us_to_user.html', first_name=first_name, last_name=last_name, email=email, subject=subject, more_information=more_information)
            )

            # return {"Success": "Form submitted successfully"}, 200

        except Exception as e:
            raise InternalServerError
            # return {"Error": "An error occurred while attempting to submit this form"}, 400