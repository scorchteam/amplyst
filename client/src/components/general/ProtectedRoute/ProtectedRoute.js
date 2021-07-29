import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends Component {

    render() {
        return (
            this.props.loggedIn ?
            <Route path={this.props.path} component={() => <this.props.component logout={this.props.logout} userInfo={this.props.userInfo} userListData={this.props.userListData} token={this.props.token} />} exact={this.props.exact}/> :
            <Redirect to={{ pathname: "/login", state: {from: this.props.location} }} />
        );
    }
}

export default ProtectedRoute;