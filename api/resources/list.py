from flask import Response, request, jsonify
from database.models import List, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
import json

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, InternalServerError, UpdatingListError, DeletingListError, ListNotExistsError

class ListApi(Resource):

    @jwt_required()
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            _list = List.objects.get(id=id, added_by=user_id)
            body = request.get_json()
            List.objects.get(id=id).update(**body)
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
            body = request.get_json()
            user = User.objects.get(id=user_id)
            _list = List(**body, added_by=user)
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