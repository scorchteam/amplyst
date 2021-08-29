import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Container, Nav} from "react-bootstrap";
import { CustomButtonLink } from "../";
import "./Header.scss";
import companyLogoPurple from "../../../img/Amplyst-svg-header-purple.svg";

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genericPageList: ["/", "/about", "/contact", "/examples", "/privacy-policy", "terms-and-conditions"],
            userPageList: ["/welcome", "/lists", "/profile", "/friends", "/calendar", "/settings"],
            noNavButtons: ["/login", "/register"]
        }
    }


    getPageDetails() {
        var generic = false;
        var user = false;
        for (var genericPageListIndex in this.state.genericPageList) {
            if (this.props.location.pathname === this.state.genericPageList[genericPageListIndex]) {
                generic = true;
                break;
            }
        }
        for (var userPageListIndex in this.state.userPageList) {
                if (this.props.location.pathname === this.state.userPageList[userPageListIndex]) {
                    user = true;
                    break;
                }
        }
        return {
            pathname: this.props.location.pathname,
            generic: generic,
            user: user,
        }
    }

    renderNavLinks() {
        const pageDetails = this.getPageDetails()
        if (pageDetails.user === true) {
            return this.renderNavLinksUser();
        } else {
            return this.renderNavLinksGeneric();
        }
    }

    renderNavLinksUser() {
        return (
            <>
                <Link className={`nav-link ${this.props.location.pathname === "/welcome"? 'active': ''}`} data-rb-event-key="#welcome" to="/welcome">
                    Home
                </Link>
                <Link className={`nav-link ${this.props.location.pathname === "/lists"? 'active': ''}`} data-rb-event-key="#lists" to="/lists">
                    Lists
                </Link>
                <Link className={`nav-link ${this.props.location.pathname === "/profile"? 'active': ''}`} data-rb-event-key="#profile" to="/profile">
                    Profile
                </Link>
                <Link className={`nav-link ${this.props.location.pathname === "/friends"? 'active': ''}`} data-rb-event-key="#friends" to="/friends">
                    Friends
                </Link>
                <Link className={`nav-link ${this.props.location.pathname === "/calendar"? 'active': ''}`} data-rb-event-key="#calendar" to="/calendar">
                    Calendar
                </Link>
                <Link className={`nav-link ${this.props.location.pathname === "/settings"? 'active': ''}`} data-rb-event-key="#settings" to="/settings">
                    Settings
                </Link>
            </>
        );
    }

    renderNavLinksGeneric() {
        return (
            <>
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
            </>
        );
    }



    renderNavButtons() {
        const loggedIn = this.props.loggedIn;
        const pathname = this.props.location.pathname;
        const pageDetails = this.getPageDetails();
        
        for (var location in this.state.noNavButtons) {
            if (pathname === this.state.noNavButtons[location]) {
                return (
                    <>
                    </>
                )
            }
        }

        if (loggedIn) {
            return this.renderNavButtonsLoggedIn(pageDetails);
        } else {
            return this.renderNavButtonsNotLoggedIn();
        }
    }

    renderNavButtonsLoggedIn(pageDetails) {
        return (
            <div className="button-container">
                <CustomButtonLink buttonAddress="/logout" buttonText="Logout"/>
                {
                    pageDetails.generic &&
                    <>
                        <div className="button-spacer">Or</div>
                        <CustomButtonLink buttonAddress="/welcome" buttonText="My Home"/>
                    </>
                }
            </div>
        );
    }

    renderNavButtonsNotLoggedIn() {
        return (
            <div className="button-container">
                <CustomButtonLink buttonAddress="/login" buttonText="Login"/>
                <div className="button-spacer">Or</div>
                <CustomButtonLink buttonAddress="/register" buttonText="Register"/>
            </div>
        );
    }

    
    render() {
        return (
            <>
                <Navbar className="bg-header" variant="dark" expand="lg">
                    <Container fluid="md">
                        <Link className="navbar-brand" to="/">
                            <img className="brand-logo" alt="list-icon" src={companyLogoPurple}></img>
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end">
                            <Nav className="nav-link-container">
                                {
                                    this.renderNavLinks()
                                }
                            </Nav>
                            {
                                this.renderNavButtons()
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default withRouter(Navigation);