from flask import Response, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
import json, sys

from database.models import GenericList

from .list import list_types
from .list import createGiftListItems, createShoppingListItems, createTodoListItems, parseGenericBodyDates


class ListItemsApi(Resource):

    @jwt_required()
    def put(self, id):
        try:
            #Grab user identity
            user_id = get_jwt_identity()

            #Grab request data
            body = request.get_json(force=True)
            list_type = body["list_type"]
            body_list_elements = body["list_elements"]
            new_list_elements = []

            # Validate that listType is a known type
            if list_type not in list_types:
                return {"Error": "Invalid List Type '" + str(list_type) + "' in field list_type"}, 400

            #Create list items list
            if (list_type == "gift"):
                new_list_elements = createGiftListItems(new_list_elements, body_list_elements)
            elif (list_type == "todo"):
                new_list_elements = createTodoListItems(new_list_elements, body_list_elements)
            elif (list_type == "shopping"):
                new_list_elements = createShoppingListItems(new_list_elements, body_list_elements)
            else:
                return {"Error": "Invalid List Type '" + str(list_type) + "' in field list_type"}, 400

            finalListData = {}
            finalListData["list_items"] = new_list_elements
            finalListData["date_last_modified"] = datetime.utcnow()

            #Update list object
            GenericList.objects.get(id=id, added_by=user_id).update(**finalListData)
            return {"success": "list updated successfully"}, 200
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingListError
        except Exception:
            raise InternalServerError