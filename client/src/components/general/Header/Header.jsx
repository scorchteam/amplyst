import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Container, Nav} from "react-bootstrap";
import { CustomButtonLink } from "../";
import "./Header.scss";

/**
 * Creates the main Header component for Amplyst
 */
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genericPageList: ["/", "/about", "/contact", "/examples", "/privacy-policy", "terms-and-conditions"],
            userPageList: ["/welcome", "/lists", "/profile", "/friends", "/calendar", "/settings"],
            noNavButtons: ["/login", "/register"]
        }
    }


    /**
     * 
     * @returns Dictionary containing current pageDetails
     */
    getPageDetails() {
        //Local var defs
        var generic = false;
        var user = false;

        //Loop through generic page list and check if generic page
        for (var genericPageListIndex in this.state.genericPageList) {
            if (this.props.location.pathname === this.state.genericPageList[genericPageListIndex]) {
                generic = true;
                break;
            }
        }
        //Loop through user page list and check if user authenticated page
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

    /**
     * Renders the nav links based on type of page
     * @returns Nav links render based on page details
     */
    renderNavLinks() {
        const pageDetails = this.getPageDetails()
        if (pageDetails.user === true) {
            return this.renderNavLinksUser();
        } else {
            return this.renderNavLinksGeneric();
        }
    }

    /**
     * Renders nav links for user authenticated page
     * @returns JSX render of nav links for user authenticated page
     */
    renderNavLinksUser() {
        return (
            <>
                <Link className={`nav-link ${this.props.location.pathname === "/welcome"? 'active': ''}`} data-rb-event-key="#welcome" to="/welcome">
                    Home
                </Link>
                <Link className={`nav-link ${this.props.location.pathname === "/lists"? 'active': ''}`} data-rb-event-key="#lists" to="/lists">
                    Lists
                </Link>
                {/* <Link className={`nav-link ${this.props.location.pathname === "/profile"? 'active': ''}`} data-rb-event-key="#profile" to="/profile">
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
                </Link> */}
            </>
        );
    }

    /**
     * Renders nav links for generic page
     * @returns JSX render of nav links for generic page
     */
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


    /**
     * Returns Conditional render of nav buttons based on page details
     * @returns Conditional render of nav buttons based
     * on page details
     */
    renderNavButtons() {
        //Local vars
        const loggedIn = this.props.loggedIn;
        const pathname = this.props.location.pathname;
        const pageDetails = this.getPageDetails();
        
        //Loop through pages where nav buttons shouldn't exist and check
        //if one is the current page
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

    /**
     * Renders nav buttons for logged in users
     * @param {object} pageDetails 
     * @returns nav buttons for logged in users
     */
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

    /**
     * Returns render of nav buttons for non-logged in users
     * @returns render of nav buttons for non-logged in users
     */
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
                        <Link id="navbar-brand" className="navbar-brand" to="/">
                            <div>
                                <p className="header-logo">Amplyst</p>
                            </div>
                            {/* <img className="brand-logo" alt="list-icon" src={companyLogoPurple}></img> */}
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

export default withRouter(Header);