from flask import Response, request, jsonify
from database.models import List, User, ListType, GiftList, ToDoList, ShoppingList
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
import json, sys
from datetime import datetime

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
            #Grab user list matching id
            listToBeUpdated = List.objects.get(id=id, added_by=user_id)
            #Grab request data
            body = request.get_json()
            list_type = body["list_type"]
            list_items = []

            #validated listType variable
            validated_list_type = None
            
            # Validate that listType is a known type
            for type in list_types:
                if (list_type == type):
                    validated_list_type = type
                    break

            if validated_list_type is None:
                return {"Error": "Invalid List Type '" + str(list_type) + "' in field list_type"}, 400

            #Call appropriate helper def per list type
            if (validated_list_type == "gift"):
                list_items = createGiftListItems(list_items, body["list_elements"])
            elif (validated_list_type == "todo"):
                list_items = createTodoListItems(list_items, body["list_elements"])
            elif (validated_list_type == "shopping"):
                list_items = createShoppingListItems(list_items, body["list_elements"])
            else:
                return {"Error": "Invalid List Type '" + str(list_type) + "' in field list_type"}, 400

            #Create dict for updating
            listToBeUpdated = {
                "list_name": body["list_name"],
                "list_description": body["list_description"],
                "list_type": validated_list_type,
                "list_items": list_items
            }
            #Update list object
            List.objects.get(id=id).update(**listToBeUpdated)
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
            _list = List.objects.get(id=id, added_by=user_id)
            _list.delete()
            return {"success": "list deleted successfully"}, 200
        except DoesNotExist:
            raise DeletingListError
        except Exception:
            raise InternalServerError

    @jwt_required()
    def get(self, id):
        try:
            _list = List.objects.get(id=id).to_json()
            _list_json = json.loads(_list)
            _list_json.pop('added_by', None)
            return _list_json, 200
        except DoesNotExist:
            raise ListNotExistsError
        except Exception:
            raise InternalServerError

    

class ListsApi(Resource):

    @jwt_required()
    def post(self):
        try:
            #Grab userId from token
            user_id = get_jwt_identity()
            #Grab request body
            body = request.get_json(force=True)
            #Grab user document from MongoDB
            user = User.objects.get(id=user_id)

            #Defined list type from request
            list_type = body["list_type"]
            #Set of list items to add to top level list obj
            list_items = []

            #validated listType variable
            validated_list_type = None
            
            # Validate that listType is a known type
            for type in list_types:
                if (list_type == type):
                    validated_list_type = type
                    break

            if validated_list_type is None:
                return {"Error": "Invalid List Type '" + str(list_type) + "' in field list_type"}, 400

            #Call appropriate helper def per list type
            if (validated_list_type == "gift"):
                list_items = createGiftListItems(list_items, body["list_elements"])
            elif (validated_list_type == "todo"):
                list_items = createTodoListItems(list_items, body["list_elements"])
            elif (validated_list_type == "shopping"):
                list_items = createShoppingListItems(list_items, body["list_elements"])
            else:
                return {"Error": "Invalid List Type '" + str(list_type) + "' in field list_type"}, 400

            ## Create the list
            #Get time in datetime obj
            dateCreatedDateTime = datetime.strptime(body["date_created"], "%m/%d/%Y")
            newList = List (
                list_name = body["list_name"],
                list_description = body["list_description"],
                list_type = list_type,
                list_items = list_items,
                date_created = dateCreatedDateTime,
                added_by=user
            )

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
            full_lists = List.objects(added_by=user_id).to_json()
            lists_json = json.loads(full_lists)
            for _list in lists_json:
                _list.pop('added_by', None)
            return lists_json, 200
        except DoesNotExist:
            raise ListNotExistsError
        except Exception:
            raise InternalServerError

def createGiftListItems(list_items, list_elements):
    for element in list_elements:
        list_items.append(
            GiftList(
                item_name = element["item_name"],
                item_description = element["item_description"],
                item_price = element["item_price"],
                item_link = element["item_link"],
                item_is_bought = element["item_is_bought"],
                item_bought_by = element["item_bought_by"]
            )  
        )
    return list_items

def createTodoListItems(list_items, list_elements):
    for element in list_elements:
        dateTimeDueDateTime = datetime.strptime(element["item_time_due"], "%m/%d/%Y")
        list_items.append( 
            ToDoList (
                item_name = element["item_name"],
                item_description = element["item_description"],
                item_is_checked = element["item_is_checked"],
                item_time_due = dateTimeDueDateTime
            )   
        )
    return list_items

def createShoppingListItems(list_items, list_elements):
    for element in list_elements:
        list_items.append(
            ShoppingList(
                item_name = element["item_name"],
                item_description = element["item_description"],
                item_price = element["item_price"],
                item_link = element["item_link"]
            )   
        )
    return list_items