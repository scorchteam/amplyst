import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import './CustomButtonLink.scss';

class CustomButtonLink extends Component  {
    render() {
        return (
            <Link to={this.props.buttonAddress}>
                <Button className="custom-button" size={this.props.size && this.props.size}>
                    {this.props.buttonText}
                </Button>
            </Link>
        );
    }
}

export default CustomButtonLink;