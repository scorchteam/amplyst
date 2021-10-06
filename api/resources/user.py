""" 
    user.py
    Authors: Tim Poehlman, Nicholas Prussen
    Description: Used to handle requests on user data
"""

from flask import Response, request, jsonify
from database.models import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
import json

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, InternalServerError, UpdatingListError, DeletingListError, ListNotExistsError

class UserInfo(Resource):
    
    @jwt_required()
    def get(self):
        try:
            #Grab user identity and data
            user_id = get_jwt_identity()
            user = User.objects.get(id=user_id)

            #Create default return object
            userInfo = {"first_name": user.first_name, "email": user.email}

            #Grab optional keys
            if (user.last_name != None):
                userInfo["last_name"] = user.last_name
            if (user.address != None):
                address = user.address
                addressObj = {
                    "address1": address.address1,
                    "city": address.city,
                    "state": address.state,
                    "zipcode": address.zipcode
                }
                if (address.address2 != None):
                    addressObj["address2"] = address.address2
                userInfo["address"] = addressObj
            #Return user info
            return userInfo, 200
        except (FieldDoesNotExist, ValidationError):
            raise SchemaValidationError
        except Exception as e:
            raise InternalServerError