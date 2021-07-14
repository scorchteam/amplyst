from flask import Response, request, jsonify
from database.models import List, User, ListType, GiftList, ToDoList, ShoppingList
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
import json, sys
from datetime import datetime

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, InternalServerError, UpdatingListError, DeletingListError, ListNotExistsError

class ListApi(Resource):

    @jwt_required()
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            _list = List.objects.get(id=id, added_by=user_id)
            body = request.get_json()
            list_type = body["list_type"]

            list_items = None

            # Set the list elements
            if (list_type == "gift"):
                list_items = GiftList(body["listElements"])
            elif(list_type == "todo"):
                list_items = ToDoList(body["listElements"])
            elif(list_type == "shopping"):
                list_items = ShoppingList(body["listElements"])

            # Create the list
            _list = List(
                        list_name = body["list_name"],
                        list_description = body["list_description"],
                        list_type = list_type,
                        list_items = list_items,
                        date_created = body["date_created"],
                        added_by=user
                        )

            List.objects.get(id=id).update(_list)
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
            user_id = get_jwt_identity()
            body = request.get_json(force=True)
            user = User.objects.get(id=user_id)
            list_type = body["list_type"]

            list_items = []

            # Set the list elements
            for item in body["list_elements"]:
                if (list_type == "gift"):
                    list_items.append( GiftList(
                                        item_name = item["item_name"],
                                        item_description = item["item_description"],
                                        item_link = item["item_link"],
                                        item_isBought = item["item_isBought"],
                                        item_boughtBy = item["item_boughtBy"]
                                        )   
                                    )
                elif(list_type == "todo"):
                    list_items.append( ToDoList(
                                        item_name = item["item_name"],
                                        item_description = item["item_description"],
                                        item_isChecked = item["item_isChecked"],
                                        item_isTimeSensitive = item["item_isTimeSensitive"],
                                        item_timeDue = item["item_timeDue"]
                                        )   
                                    )
                elif(list_type == "shopping"):
                    list_items.append( ShoppingList(
                                        item_name = item["item_name"],
                                        item_description = item["item_description"],
                                        item_link = item["item_link"]
                                        )   
                                    )

            # Create the list
            dateCreatedDateTime = datetime.strptime(body["date_created"], "%m/%d/%Y")
            _list = List(
                        list_name = body["list_name"],
                        list_description = body["list_description"],
                        list_type = list_type,
                        list_items = list_items,
                        date_created = dateCreatedDateTime,
                        added_by=user
                        )

            _list.save()
            user.update(push__lists=_list)
            user.save()
            id = _list.id
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