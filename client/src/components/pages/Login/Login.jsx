import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import { CustomButton } from "../../general";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import './Login.scss';

import { flask_url } from "../../../App";
import validator from "validator";

/** Login component for user authentication */
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        email: "",
        password: ""
      },
      tempUserInfo: {
        email: null,
        password: null,
      },
      errors: {},
      loggedIn: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle submission of login form. Validates and then initiates request
   * @param {event} event 
   */
  handleSubmit(event) {
    event.preventDefault();

    var tempUserInfo = this.state.tempUserInfo;
    var finalUserInfo = {}
    var errors = this.state.errors;

    /** Loop through temp object and validate fields */
    for(var key in tempUserInfo){
      if(key === "email"){
        if(tempUserInfo[key] !== null && tempUserInfo[key] !== ""){
          finalUserInfo[key] = tempUserInfo[key];
        } else {
          errors["email"] = "Email must not be blank";
          this.setState({
            errors: errors
          });
        }
      }

      if(key === "password"){
        if(tempUserInfo[key] !== null && tempUserInfo[key] !== ""){
          finalUserInfo[key] = tempUserInfo[key];
        } else {
          errors["password"] = "Password must not be blank";
          this.setState({
            errors: errors
          });
        }
      }
    }

    /** Check to make sure required fields exist before request */
    if(finalUserInfo.hasOwnProperty("email") && finalUserInfo.hasOwnProperty("password") && Object.keys(errors).length === 0){
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'crossorigin': 'true',
        },
        body: JSON.stringify(finalUserInfo)
      };

      //Remove token just in case
      localStorage.removeItem('token');

      //Request using form data
      fetch(flask_url + "/api/user/auth/login", requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.token !== undefined){
              this.setState({
                loggedIn: true,
                token: result.token
              });
              this.props.setLoggedIn(result.token);
              this.props.history.push("/welcome");
            } else {
              var errors = this.state.errors;
              errors["login"] = "No account could be found with that username or password";
              this.setState({
                errors: errors
              });
            }
          },
          (error) => {
          }
        );
    }
  }

  /**
   * Handle input changes when user is inputing to form
   * @param {event} event 
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    var tempUserInfo = this.state.tempUserInfo;
    var errors = this.state.errors;

    //Grab html values
    tempUserInfo[[name]] = value;

    /** Validate fields */
    if(name === "email"){
      this.validateEmail(value, errors);
    }

    if(name === "password"){
      this.validatePassword(value, errors);
    }

    this.setState({
      tempUserInfo: tempUserInfo
    });
  }

  /** Validate emails */
  validateEmail(email, errors){
    var errorCount = 0;

    if(email === ""){
      errors["email"] = "Email must not be blank";
      errorCount++;
    }

    if(!validator.isEmail(email)){
      errors["email"] = "Not a valid email";
      errorCount++;
    }

    if(errorCount <= 0){
      delete errors.email;
    }

    this.setState({
      errors: errors
    });
  }

  /** Validate password field */
  validatePassword(password, errors){
    var errorCount = 0;

    //empty input box
    if (password === "") {
      errors["password"] = "Password must not be blank";
      errorCount++;
    }

    if (password !== undefined && password.length < 8) {
      errors["password"] = "Password must be 8 characters or longer";
      errorCount++;
    }

    //reset errors if none found
    if (errorCount <= 0) {
      delete errors.password;
    }

    this.setState({
      errors: errors
    });
  }

  render() {
    return (
      <div className="login-form">
        <Container className="login-container">
          <div className="login-form-container">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handInputChange}
                type="email"
                placeholder="johndoe@something.com"
              />
              <p className="text-danger">{this.state.errors.email}</p>

              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handInputChange}
                type="password"
                placeholder="reallygoodpassword"
              />
              <p className="text-danger">{this.state.errors.password}</p>
              <p className="text-danger text-center">{this.state.errors.login}</p>
              <div className="button-container">
                
                <CustomButton buttonText="Login" size="lg" type="submit" />
              </div>
            </form>
            <div className="register-redirect">
              <p className="left-text">New Here?</p>
              <p><Link to="/register">Create Your Account Now</Link></p>
            </div>
            <div className="forgot-password">
              <p><Link to="/forgot">Forgot Password?</Link></p>
            </div>
          </div>
        </Container>

        {
          this.state.token &&
          <Redirect
            to={{
              pathname: "/welcome",
              state: { token: this.state.token}
            }}
          />
        }
      </div>
    );

  }
}

export default withRouter(Login);