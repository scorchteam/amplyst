import React, { Component } from "react";
import { withRouter } from "react-router";

class Logout extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

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