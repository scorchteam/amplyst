"""

Author:
Nicholas Prussen
"""

#Import
from flask import Flask, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_mail import Mail

from database.db import initialize_db
from flask_restful import Api
from resources.errors import errors
# from services.extensions import mail

from flask_cors import CORS

import os

#Initialize flask app
app = Flask(__name__)
# app.config.from_envvar('ENV_LOCATION')
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ.get("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.environ.get("MAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
# mail.init_app(app)
mail = Mail(app)

from resources.routes import initialize_routes

api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://testuser:testuser@giftlists-restful.syfrq.mongodb.net/user?authSource=admin&replicaSet=atlas-7x73tj-shard-0&readPreference=primary'
}

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify(code="msg", err="Token has expired"), 200

initialize_db(app)
initialize_routes(api)

#Base route
@app.route('/')
def root():
    return {"Hello": "World!"}


#Run the flask app
# if __name__ == '__main__':
    # app.run(host='0.0.0.0', debug=True)
