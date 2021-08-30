import React from "react";
import { Button } from "react-bootstrap";
import './CustomButton.scss';

/**
 * Custom button based off react-bootstrap button
 * 
 * Props:
 * size:                Size of the button. Use bootstrap size definitions
 * as:                  As prop used by react-bootstrap button
 * type:                Type of button. Use bootstrap definitions
 * buttonText:          Custom button internal text
 * @returns Rendered button
 */
function CustomButton(props) {
    return (
        <Button className="custom-button" size={props.size && props.size} as={props.as && props.as} type={props.type && props.type}>
            {props.buttonText}
        </Button>
    )
}

export default CustomButton;