import React from "react";
import { Link } from "react-router-dom";
import './Footer.scss';
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <div className="bg-footer">
      <Container fluid="md">
        <footer>
          <div className="row">
            <div className="col">
              <ul>
                <li>&copy; 2021 GiftLists.org</li>
                <li>
                  <Link to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
}

export default Footer;