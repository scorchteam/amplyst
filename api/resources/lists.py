from flask import Response, request, jsonify
from database.models import GenericList, User, GenericListItem, GiftListItem, TodoListItem, ShoppingListItem, ShoppingList, TodoList, GiftList
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
import json, sys
from datetime import datetime

from .list import list_types
from .list import createGiftListItems, createShoppingListItems, createTodoListItems, parseGenericBodyDates

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, InternalServerError, UpdatingListError, DeletingListError, ListNotExistsError

class ListsApi(Resource):

    @jwt_required()
    def post(self):
        try:
            #Grab userId from token
            user_id = get_jwt_identity()

            #Grab user document from MongoDB
            user = User.objects.get(id=user_id)

            #Grab request body
            body = request.get_json(force=True)
            list_type = body["list_type"]
            list_elements = body["list_elements"]
            list_items = []

            # Validate that listType is a known type
            if list_type not in list_types:
                return {"Error": "Invalid List Type '" + str(list_type) + "' in field list_type"}, 400

            #Create list items list
            if (list_type == "gift"):
                list_items = createGiftListItems(list_items, list_elements)
            elif (list_type == "todo"):
                list_items = createTodoListItems(list_items, list_elements)
            elif (list_type == "shopping"):
                list_items = createShoppingListItems(list_items, list_elements)
            else:
                return {"Error": "Invalid List Type '" + str(list_type) + "' in field list_type"}, 400

            #Final dictionary for list data
            finalListData = {}


            #Grab generic data
            if "list_name" in body:
                finalListData["list_name"] = body["list_name"]
            if "list_description" in body:
                finalListData["list_description"] = body["list_description"]
            if len(list_items) is not 0:
                finalListData["list_items"] = list_items
            currentDatetime = datetime.utcnow()
            finalListData["date_created"] = currentDatetime
            finalListData["date_last_modified"] = currentDatetime
            finalListData["added_by"] = user
            
            newList = None

            if (list_type.lower() == "gift"):
                newList = GiftList(**finalListData)
            elif (list_type.lower() == "todo"):
                newList = TodoList(**finalListData)
            elif (list_type.lower() == "shopping"):
                newList = ShoppingList(**finalListData)

            #Save list and return valid request
            newList.save()
            user.update(push__lists=newList)
            user.save()
            id = newList.id
            return {'id': str(id)}, 200
        except (FieldDoesNotExist, ValidationError):
            raise SchemaValidationError
        except Exception as e:
            raise InternalServerError

    @jwt_required()
    def get(self):
        try:
            user_id = get_jwt_identity()
            full_lists = GenericList.objects(added_by=user_id).to_json()
            lists_json = json.loads(full_lists)
            for _list in lists_json:
                _list.pop('added_by', None)
            return lists_json, 200
        except DoesNotExist:
            raise ListNotExistsError
        except Exception:
            raise InternalServerError