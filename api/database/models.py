from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash
from bson import objectid
from datetime import datetime
from enum import Enum
import uuid

class ListTypes(Enum):
    GIFT = 'GIFT'
    SHOPPING = 'SHOPPING'
    TODO = 'TODO'

class GenericListItem(db.EmbeddedDocument):
    meta = {'allow_inheritance': True}
    item_id=db.ObjectIdField(required=True, unique=True)
    item_name=db.StringField(max_length=64, required=True)
    item_description=db.StringField(max_length=512)

class GiftListItem(GenericListItem):
    item_price=db.DecimalField(default=0.00, min_value=0.00, precision=2, max_value=100000.00)
    item_intended_for_name=db.StringField(default="")
    item_intended_for_id=db.ObjectIdField()
    item_is_bought=db.BooleanField(default=False)
    item_bought_by_name=db.StringField(default="")
    item_bought_by_id=db.ObjectIdField()

class TodoListItem(GenericListItem):
    item_is_checked=db.BooleanField(required=True, default=False)
    item_due_date=db.DateTimeField()

class ShoppingListItem(GenericListItem):
    item_is_bought=db.BooleanField(default=False)
    item_price=db.DecimalField(default=0.00, min_value=0.00, precision=2, max_value=100000.00)
    item_location=db.StringField(default="")
    item_link=db.URLField(default="")

class GenericList(db.Document):
    meta = {'collection': 'lists', 'allow_inheritance': True}
    list_name = db.StringField(required=True)
    list_description = db.StringField(default="")
    list_items = db.ListField(db.EmbeddedDocumentField('GenericListItem'))
    added_by = db.ReferenceField('User')
    date_created = db.DateTimeField()
    date_last_modified = db.DateTimeField()

class GiftList(GenericList):
    list_type=db.EnumField(ListTypes, default=ListTypes.GIFT)

class ShoppingList(GenericList):
    list_type=db.EnumField(ListTypes, default=ListTypes.SHOPPING)

class TodoList(GenericList):
    list_type=db.EnumField(ListTypes, default=ListTypes.TODO)

class Address(db.EmbeddedDocument):
    address1 = db.StringField(required=True)
    address2 = db.StringField()
    city = db.StringField(required=True)
    state = db.StringField(required=True)
    zipcode = db.IntField(required=True, min_value=00000, max_value=99999)

class User(db.Document):
    meta = {'collection': 'user_info'}
    first_name = db.StringField(requried=True, max_length=128)
    last_name = db.StringField(max_length=128, default="")
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)
    address = db.EmbeddedDocumentField('Address')
    lists = db.ListField(db.ReferenceField('GenericList', reverse_delete_rule=db.PULL))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

User.register_delete_rule(GenericList, 'added_by', db.CASCADE)
