import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * Authenticates route based off of user login status
 * @param {object} props 
 * 
 * Props:
 * loggedIn:        Whether the user is logged in or not
 * logout:          Callback function for logging out user
 * userInfo:        UserInfo object
 * userListData:    User lists that were first pulled
 * token:           User authentication token
 * exact:           Exact boolean for matching exact name
 * location:        Address that we redirected from
 * 
 * @returns render of user component
 */
function ProtectedRoute(props : any) {
    return (
        props.loggedIn ?
        <Route {...props} path={props.path} component={() => <props.component logout={props.logout} userInfo={props.userInfo} userListData={props.userListData} updateUserListData={props.updateUserListData} activeListId={props.activeListId} activeListData={props.activeListData} updateActiveListId={props.updateActiveListId} updateActiveListData={props.updateActiveListData} token={props.token} />} exact={props.exact}/> :
        <Redirect to={{ pathname: "/login", state: {from: props.location}}} />
    );
}

export default ProtectedRoute;