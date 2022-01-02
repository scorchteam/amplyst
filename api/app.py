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
    return '<html style="margin: 0; padding: 0"><body style="margin: 0; padding: 0"><img id="gif" class="nlSABoG9CSaJpsufv8WW9 _3vYn8QjoEvrXxHyqdn9ddZ _2XBDTIVigBJDybhZvL-hU3" src="https://media2.giphy.com/media/Nx0rz3jtxtEre/200w.webp?cid=dda24d50b6865d08310745854cc23e585f3a7d434fe381ba&amp;rid=200w.webp&amp;ct=g" srcset="https://media2.giphy.com/media/Nx0rz3jtxtEre/200w.webp?cid=dda24d50b6865d08310745854cc23e585f3a7d434fe381ba&amp;rid=200w.webp&amp;ct=g 200w,https://media2.giphy.com/media/Nx0rz3jtxtEre/giphy.webp?cid=dda24d50b6865d08310745854cc23e585f3a7d434fe381ba&amp;rid=giphy.webp&amp;ct=g 480w," sizes="100vw" alt=""></body></html>'


#Run the flask app
# if __name__ == '__main__':
    # app.run(host='0.0.0.0', debug=True)
