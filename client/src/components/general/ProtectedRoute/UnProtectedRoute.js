import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class UnProtectedRoute extends Component {

    render() {
        return (
            this.props.loggedIn ?
            <Redirect to={{ pathname: "/welcome", state: {from: this.props.location} }} /> : <Route path={this.props.path} component={() => <this.props.component setLoggedIn={this.props.setLoggedIn} logout={this.props.logout} />} exact={this.props.exact}/>
        );
    }
}

export default UnProtectedRoute;