import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import "./Settings.scss";

class Settings extends Component {

  constructor(props) {
      super(props);

      console.log(this.props);
  }

  render() {
    return (
      <Container>
        
      </Container>
    );
  }
}

export default withRouter(Settings);