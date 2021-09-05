import React, { Component } from "react";
import { withRouter } from "react-router";

/** Logout component for removing user validation */
class Logout extends Component {

  constructor(props) {
    super(props);
  }

  //Logout when component mounts
  componentDidMount() {
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>Logging Out</div>
    );
  }
}

export default withRouter(Logout);