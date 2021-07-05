import React, { Component } from "react";
import { Button } from "react-bootstrap";
import './CustomButton.scss';

class CustomButton extends Component {
    render() {
        return (
            <Button className="custom-button" size={this.props.size && this.props.size} as={this.props.as && this.props.as} type={this.props.type && this.props.type}>
                {this.props.buttonText}
            </Button>
        );
    }
}

export default CustomButton;