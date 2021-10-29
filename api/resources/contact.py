from flask import Flask
from flask_mail import Message
from services.extensions import mail
from flask_restful import Resource

class ContactApi(Resource):
    def get(self):
        try:
            msg = Message("Testing", sender='contactus@scorchteam.com', recipients=['contactus@scorchteam.com'])
            msg.body = "This is a test email from flask"
            mail.send(msg)
            return "Message Sent", 200
        except Exception:
            raise InternalServerError