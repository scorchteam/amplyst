import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import { CustomButtonLink } from "../../general";
import "./Welcome.scss";

class Welcome extends Component {

  constructor(props) {
      super(props);

      console.log(this.props);
  }

  render() {
    return (
      <Container className="welcome-container" fluid="md">
        <div className="col column-1">
          <CustomButtonLink buttonAddress="/lists" buttonText="My Lists" />
          <CustomButtonLink buttonAddress="/profile" buttonText="My Profile" />
          <CustomButtonLink buttonAddress="/friends" buttonText="My Friends" />
          <CustomButtonLink buttonAddress="/calendar" buttonText="My Calendar" />
          <CustomButtonLink buttonAddress="/settings" buttonText="Settings" />
        </div>
        <div className="col column-2">

        </div>
      </Container>
    );
  }
}

export default withRouter(Welcome);