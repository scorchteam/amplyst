import React from "react";
import { CustomHyperlink } from "..";
import './Footer.scss';
import { Container } from "react-bootstrap";

/**
 * Returns a render of the footer component
 * @returns Render of the footer component
 */
function Footer() {
  return (
    <div className="bg-footer">
      <Container fluid="md">
        <footer>
          <div className="row">
            <div className="col">
              <ul>
                <li>&copy; 2021 Amplyst.com</li>
                <li>
                  <CustomHyperlink linkAddress="/" hyperlinkText="Home" />
                </li>
                <li>
                  <CustomHyperlink linkAddress="privacy-policy" hyperlinkText="Privacy Policy" />
                </li>
                <li>
                  <CustomHyperlink linkAddress="/term-and-conditions" hyperlinkText="Terms and Conditions" />
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