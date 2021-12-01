from flask import Response, request, jsonify
from database.models import GenericList, User, GenericListItem, GiftListItem, TodoListItem, ShoppingListItem, ShoppingList, TodoList, GiftList
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
import json, sys
from datetime import datetime
from bson import objectid

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, InternalServerError, UpdatingListError, DeletingListError, ListNotExistsError

list_types = [
    "gift",
    "todo",
    "shopping"
]

class ListApi(Resource):

    @jwt_required()
    def put(self, id):
        try:
            #Grab user identity
            user_id = get_jwt_identity()
            
            #Grab request data
            body = request.get_json()
            list_type = body["list_type"]
            list_elements = body["list_items"]
            list_items = []
            
            # Validate that listType is a known type
            if list_type.lower() not in list_types:
                return {"Error": "Invalid List Type '" + str(list_type) + "' in field list_type"}, 400

            #Create list items list
            if (list_type.lower() == "gift"):
                list_items = createGiftListItems(list_items, list_elements)
            elif (list_type.lower() == "todo"):
                list_items = createTodoListItems(list_items, list_elements)
            elif (list_type.lower() == "shopping"):
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
            finalListData["date_last_modified"] = datetime.utcnow()
            finalListData["list_items"] = list_items

            #Update list object
            if (list_type.lower() == "gift"):
                GiftList.objects.get(id=id, added_by=user_id).update(**finalListData)
            elif (list_type.lower() == "todo"):
                TodoList.objects.get(id=id, added_by=user_id).update(**finalListData)
            elif (list_type.lower() == "shopping"):
                ShoppingList.objects.get(id=id, added_by=user_id).update(**finalListData)

            return {"success": "list updated successfully"}, 200
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingListError
        except Exception:
            raise InternalServerError

    @jwt_required()
    def delete(self, id):
        try:
            user_id = get_jwt_identity()
            _list = GenericList.objects.get(id=id, added_by=user_id)
            _list.delete()
            return {"success": "list deleted successfully"}, 200
        except DoesNotExist:
            raise DeletingListError
        except Exception:
            raise InternalServerError

    @jwt_required()
    def get(self, id):
        try:
            _list = GenericList.objects.get(id=id).to_json()
            _list_json = json.loads(_list)
            _list_json.pop('added_by', None)
            return _list_json, 200
        except DoesNotExist:
            raise ListNotExistsError
        except Exception:
            raise InternalServerError

def createGiftListItems(list_items, list_elements):
    for element in list_elements:
        element = parseGenericBodyDates(element)
        element = getItemId(element)
        element = convertStringBoolean(element, "item_is_bought")
        list_items.append(
            GiftListItem(**element)  
        )
    return list_items

def createTodoListItems(list_items, list_elements):
    for element in list_elements:
        element = parseGenericBodyDates(element)
        element = getItemId(element)
        if "item_due_date" in element:
            element["item_due_date"] = datetime.fromtimestamp(element["item_due_date"] / 1e3)
        element = convertStringBoolean(element, "item_is_checked")
        list_items.append( 
            TodoListItem(**element)   
        )
    return list_items

def createShoppingListItems(list_items, list_elements):
    for element in list_elements:
        element = parseGenericBodyDates(element)
        element = getItemId(element)
        element = convertStringBoolean(element, "item_is_bought")
        list_items.append(
            ShoppingListItem(**element)
        )
    return list_items

def parseGenericBodyDates(element):
    if "item_creation_date" in element:
        element["item_creation_date"] = datetime.fromtimestamp(element["item_creation_date"] / 1e3)
    if "item_last_modified_date" in element:
        element["item_last_modified_date"] = datetime.fromtimestamp(element["item_last_modified_date"] / 1e3)
    return element

def getItemId(element):
    if("item_id" in element and element["item_id"] is not ""):
        element["item_id"] = objectid.ObjectId(element["item_id"]["$oid"])
    else:
        element["item_id"] = objectid.ObjectId()
    return element

def convertStringBoolean(element, key):
    if key in element:
        if element[key] == "true" or element[key] == "True":
            element[key] = True
        if element[key] == "false" or element[key] == "False":
            element[key] = False
    return element