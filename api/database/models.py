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
    list_type = db.StringField(required=True)
    list_items = db.ListField(db.ReferenceField('ListType'))
    added_by = db.ReferenceField('User')
    date_created = db.DateTimeField()

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
    
class ListType(db.Document):
    meta = {'allow_inheritance': True}
    item_name=db.StringField()
    item_description=db.StringField()

class GiftList(ListType):
    item_link=db.StringField()
    item_isBought=db.BooleanField(default=False)
    item_boughtBy=db.StringField(default="anonymous")
    # We should decide on how to show the birthday, do we want to have it an extension of the List object, or just allow the user to put it in the description of the List object
class ToDoList(ListType):
    item_isChecked=db.BooleanField(default=False)
    item_isTimeSensitive=db.BooleanField(default=False)
    item_timeDue=db.DateTimeField()

class ShoppingList(ListType):
    item_link=db.StringField()
    # item_image=db.??? - figure out how to add images

User.register_delete_rule(List, 'added_by', db.CASCADE)
