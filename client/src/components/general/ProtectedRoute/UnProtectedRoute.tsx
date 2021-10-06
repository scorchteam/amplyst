import { Route, Redirect } from "react-router-dom";

/**
 * Redirects users away from pages they shouldn't see 
 * when logged in
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
 * @returns render of render of auth component
 */
export default function UnProtectedRoute(props : any) {
    if (props.loggedIn) {
        return <Redirect to={{ pathname: "/welcome", state: {from: props.location}}} />
    } else {
        return <Route path={props.path} component={() => <props.component logout={props.logout} setLoggedIn={props.setLoggedIn} userInfo={props.userInfo} userListData={props.userListData} grabUserListData={props.grabUserListData} token={props.token} />} exact={props.exact}/>
    }
}