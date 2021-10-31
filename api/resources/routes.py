from .auth import RegisterApi, LoginApi
from .list import ListApi
from .lists import ListsApi
from .listItems import ListItemsApi
from .user import UserInfo
from .contact import ContactApi
from .reset_password import ForgotPassword, ResetPassword

def initialize_routes(api):
    api.add_resource(RegisterApi, '/api/user/auth/register')
    api.add_resource(LoginApi, '/api/user/auth/login')
    api.add_resource(ListApi, '/api/user/list/<id>')
    api.add_resource(ListsApi, '/api/user/lists')
    api.add_resource(UserInfo, '/api/user/retrieveUserInfo')
    api.add_resource(ListItemsApi, '/api/user/list/items/<id>')
    api.add_resource(ContactApi, '/api/contact')
    api.add_resource(ForgotPassword, '/api/user/auth/forgot')
    api.add_resource(ResetPassword, '/api/user/auth/reset')
