import React from "react";
import { Card, Container } from "react-bootstrap";
import { CustomButtonLink } from "../../../general";

/**
 * Renders the first section of the home page
 * @returns Rendered top section of the home page
 */
function FirstSection() {
  return (
    <section className="home-first-section">
      <Container>
        <h1 className="brand-font">Amplyst.com</h1>
        <h4>Picking personal gifts is hard, lets simplify that.</h4>
        <div className="create-account-button-container">
            <CustomButtonLink size="lg" buttonText="Create Your First List Now" buttonAddress="/login" />
        </div>
        <div className="card-container">
          <Card>
            <Card.Body>
              <Card.Title>Learn More About Us</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <CustomButtonLink buttonText="Learn More..." buttonAddress="/about" />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Ask Us Anything</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <CustomButtonLink buttonText="Contact Us..." buttonAddress="/contact" />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Explore Curated Lists</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <CustomButtonLink buttonText="See Sample Lists..." buttonAddress="/examples" />
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default FirstSection;