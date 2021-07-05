class InternalServerError(Exception):
    pass

class SchemaValidationError(Exception):
    pass

class UpdatingListError(Exception):
    pass

class DeletingListError(Exception):
    pass

class ListNotExistsError(Exception):
    pass

class EmailAlreadyExistsError(Exception):
    pass

class UnauthorizedError(Exception):
    pass

errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields",
        "status": 400
    },
    "UpdatingListError": {
        "message": "Updating movie added by other is forbidden",
        "status": 403
    },
    "DeletingListError": {
        "message": "Deleting list added by other is forbidden",
        "status": 403
    },
    "ListNotExistsError": {
        "message": "List with given id does not exist",
        "status": 400
    },
    "EmailAlreadyExistsError": {
        "message": "User with given email already exists",
        "status": 400
    },
    "UnauthorizedError": {
        "message": "Invalid username or password",
        "status": 401
    }
}