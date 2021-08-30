import React from "react";
import { Container } from "react-bootstrap";

/**
 * Renders the second section of the homepage
 * @returns render of the second section of the homepage
 */
function SecondSection() {
  return (
      <section className="home-second-section">
        <Container>
            <h1>Connect With Friends and Family</h1>
            <h4>Share your wants and needs with others to remove the awkward back and forth.</h4>
        </Container>
      </section>
  );
}

export default SecondSection;