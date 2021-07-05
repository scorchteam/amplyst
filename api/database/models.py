from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash

class Address(db.EmbeddedDocument):
    address1 = db.StringField(required=True)
    address2 = db.StringField()
    city = db.StringField(required=True)
    state = db.StringField(required=True)
    zipcode = db.IntField(required=True)

class List(db.Document):
    meta = {'collection': 'lists'}
    list_name = db.StringField(required=True)
    list_description = db.StringField()
    list_items = db.DictField(default={})
    added_by = db.ReferenceField('User')

class User(db.Document):
    meta = {'collection': 'user_info'}
    first_name = db.StringField(requried=True)
    last_name = db.StringField()
    email = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)
    address = db.EmbeddedDocumentField('Address')
    lists = db.ListField(db.ReferenceField('List', reverse_delete_rule=db.PULL))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

User.register_delete_rule(List, 'added_by', db.CASCADE)
