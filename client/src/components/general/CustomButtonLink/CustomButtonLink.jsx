import React from "react";
import { Link } from "react-router-dom";
import { CustomButton } from "../";

/**
 * Custom button with a link wrapper
 * 
 * Props:
 * buttonAddress:       Address this button will redirect to
 * size:                Size of the button. Use bootstrap size definitions
 * as:                  As prop used by react-bootstrap button
 * type:                Type of button. Use bootstrap definitions
 * buttonText:          Custom button internal text
 * @returns Rendered button with link wrapper
 */
function CustomButtonLink(props) {
    return (
        <Link to={props.buttonAddress}>
            <CustomButton size={props.size && props.size} as={props.as && props.as} type={props.type && props.type} buttonText={props.buttonText && props.buttonText} />
        </Link>
    );
}

export default CustomButtonLink;