import React from "react";
import './CustomHyperlink.scss';
import { Link } from "react-router-dom";

/**
 * Custom styled hyperlink
 * 
 * Props:
 * linkAddress:         Address to redirect to
 * hyperlinkText:       Text inside hyperlink
 * 
 * @returns Rendered hyperlink
 */
function CustomHyperlink(props) {
    return (
        <Link to={props.linkAddress && props.linkAddress}>
            {props.hyperlinkText && props.hyperlinkText}
        </Link>
    )
}

export default CustomHyperlink;