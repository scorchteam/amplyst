import React, { Component } from "react";
import "./Home.scss";
import { FirstSection, SecondSection, ThirdSection } from "./sections";
import { Container } from "react-bootstrap";

/**
 * Renders the home component
 */
class Home extends Component {

  render() {
    return (
      <Container fluid className="no-margin">
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </Container>
    );
  }
}

export default Home;