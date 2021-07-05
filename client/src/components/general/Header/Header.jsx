import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Container, Nav} from "react-bootstrap";
import { CustomButtonLink } from "../";
import "./Header.scss";
import companylogo from "./../../../img/favicon.png";

class Navigation extends Component {
    
    render() {
        return (
            <>
                <Navbar className="bg-header" variant="dark" expand="lg">
                    <Container fluid="md">
                        <Link className="navbar-brand" to="/">
                            <img className="brand-logo" alt="list-icon" src={companylogo}></img>
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end">
                            <Nav className="nav-link-container">
                                <Link className={`nav-link ${this.props.location.pathname === "/"? 'active': ''}`} data-rb-event-key="#home" to="/">
                                    Home
                                </Link>
                                <Link className={`nav-link ${this.props.location.pathname === "/about"? 'active': ''}`} data-rb-event-key="#about" to="/about">
                                    About
                                </Link>
                                <Link className={`nav-link ${this.props.location.pathname === "/contact"? 'active': ''}`} data-rb-event-key="#contact" to="/contact">
                                    Contact
                                </Link>
                                <Link className={`nav-link ${this.props.location.pathname === "/examples"? 'active': ''}`} data-rb-event-key="#examples" to="/examples">
                                    Examples
                                </Link>
                            </Nav>
                            {this.props.location.pathname !== "/register" &&
                            this.props.location.pathname !== "/login" &&
                            this.props.location.pathname !== "/welcome" &&
                            this.props.loggedIn === false &&
                                <div className="button-container">
                                    <CustomButtonLink buttonAddress="/login" buttonText="Login"/>
                                    <div className="button-spacer">Or</div>
                                    <CustomButtonLink buttonAddress="/register" buttonText="Register"/>
                                </div>}

                            {
                                (this.props.loggedIn === true) &&
                                <div className="button-container">
                                    <CustomButtonLink buttonAddress="/logout" buttonText="Logout"/>
                                    {
                                        this.props.location.pathname !== "/welcome" &&
                                        <><div className="button-spacer">Or</div>
                                        <CustomButtonLink buttonAddress="/welcome" buttonText="My Home"/></>
                                    }
                                </div>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default withRouter(Navigation);