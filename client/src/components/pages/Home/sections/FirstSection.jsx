import React from "react";
import { Card, Button, Container } from "react-bootstrap";

function FirstSection() {
  return (
    <section className="home-first-section">
      <Container>
        <h1>GiftLists.org</h1>
        <h4>Picking personal gifts is hard, lets simplify that.</h4>
        <div className="create-account-button-container">
            <Button className="custom-button btn-lg">Create Your First List Now</Button>
        </div>
        <div className="card-container">
          <Card>
            <Card.Body>
              <Card.Title>Learn More About Us</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
            </Card.Text>
              <Button className="custom-button">Learn More...</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Ask Us Anything</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
            </Card.Text>
              <Button className="custom-button">Contact Us...</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Explore Curated Lists</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
            </Card.Text>
              <Button className="custom-button">See Sample Lists...</Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default FirstSection;