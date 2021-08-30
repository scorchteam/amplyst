import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { CustomButton } from "../../general/";
import validator from 'validator';
import './Register.scss';

import { flask_url } from "../../../App";

/** Register component that renders register view */
class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      finalUserInfo: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        address: null
      },
      tempUserInfo: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        passwordConfirm: null,
        address1: null,
        address2: null,
        city: null,
        state: null,
        zipcode: null
      },
      errors: {},
      formStarted: false,
      addressProvided: false,
      address: {},
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handles submission of register form
   * @param {event} event 
   */
  handleSubmit(event) {
    event.preventDefault();
    var finalUserInfo = {};

    //check if form submitted blank
    if(!this.state.formStarted){
      var fullPageErrors = {
        "first_name": "First Name must not be blank",
        "email": "Email must not be blank",
        "password": "Password must not be blank",
        "passwordConfirm": "Passwords do not match"
      };
      this.setState({
        errors: fullPageErrors,
      });
    }

    var tempErrors = this.state.errors;
    delete tempErrors.address;

    //Check if form has no errors and form was started
    if(Object.keys(tempErrors).length === 0 && this.state.formStarted){

      var tempUserInfo = this.state.tempUserInfo;
      var finalInfoErrors = {};
      var errors = this.state.errors;

      /** Loop through form data and validate fields */
      for(var key in tempUserInfo){
        //validate first name
        if(key === "first_name"){
          if(tempUserInfo[key] !== null){
            finalUserInfo[key] = tempUserInfo[key];
          } else {
            finalInfoErrors[key] = "Invalid Name";
            errors["first_name"] = "First Name must not be blank";
            this.setState({
              errors: errors
            });
          }
        }
        //validate last name
        if(key === "last_name"){
          if(tempUserInfo[key] !== null){
            finalUserInfo[key] = tempUserInfo[key];
          }
        }
        //validate email
        if(key === "email"){
          if(tempUserInfo[key] !== null){
            finalUserInfo[key] = tempUserInfo[key];
          } else {
            finalInfoErrors[key] = "Invalid Email";
            errors["email"] = "Email must not be blank";
            this.setState({
              errors: errors
            });
          }
        }
        //validate password
        if(key === "password"){
          if(tempUserInfo[key] !== null){
            if(tempUserInfo[key] === tempUserInfo["passwordConfirm"]){
              finalUserInfo[key] = tempUserInfo[key];
            } else {
              finalInfoErrors[key] = "Passwords do not match";
              this.setState({
                errors: {"passwordConfirm": "Passwords do not match"}
              });
            }
          } else {
            finalInfoErrors[key] = "Invalid Password";
            errors["password"] = "Password must not be blank";
            errors["passwordConfirm"] = "Passwords do not match";
            this.setState({
              errors: errors
            });
          }
        }

        var address = this.state.address;
        var addressComplete = false;

        //validate address
        if(this.state.addressProvided) {
          if(key === "address1"){
            if(tempUserInfo[key] !== null && tempUserInfo[key] !== ""){
              address[key] = tempUserInfo[key];
              this.setState({
                address: address
              });
            } else {
              errors["address1"] = "Address Line 1 must not be blank";
              this.setState({
                errors: errors
              });
            }
          }

          if(key === "address2"){
            if(tempUserInfo[key] !== null && tempUserInfo[key] !== ""){
              address[key] = tempUserInfo[key];
              this.setState({
                address: address
              });
            }
          }

          if(key === "city"){
            if(tempUserInfo[key] !== null && tempUserInfo[key] !== ""){
              address[key] = tempUserInfo[key];
              this.setState({
                address: address
              });
            } else {
              errors["city"] = "City must not be blank";
              this.setState({
                errors: errors
              });
            }
          }

          if(key === "state"){
            if(tempUserInfo[key] !== null && tempUserInfo[key] !== ""){
              address[key] = tempUserInfo[key];
              this.setState({
                address: address
              });
            } else {
              errors["state"] = "State must not be blank";
              this.setState({
                errors: errors
              });
            }
          }

          if(key === "zipcode"){
            if(tempUserInfo[key] !== null && tempUserInfo[key] !== ""){
              address[key] = tempUserInfo[key];
              this.setState({
                address: address
              });
            } else {
              errors["zipcode"] = "Zipcode must not be blank";
              this.setState({
                errors: errors
              });
            }
          }
        }

        

        var updatedAddress = this.state.address;

        if(updatedAddress.hasOwnProperty("address1") && updatedAddress.hasOwnProperty("city") && updatedAddress.hasOwnProperty("state") && updatedAddress.hasOwnProperty("zipcode")){
          addressComplete = true;
        }

        if(!addressComplete && this.state.addressProvided){
          errors["address"] = "Address is not complete";
        } else {
          delete errors.address;
        }

        if(addressComplete){
          finalUserInfo["address"] = address;
        }
      }

      //check that all required properties exist and no errors
      if(finalUserInfo.hasOwnProperty("first_name") && finalUserInfo.hasOwnProperty("email") && finalUserInfo.hasOwnProperty("password") && Object.keys(errors).length === 0){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalUserInfo)
        };
        //submit request
        fetch(flask_url + "/api/user/auth/register", requestOptions)
          .then(res => res.json())
          .then(data => {
            this.setState({
              done: true
            });
          });
      }
    }

    
  }

  /**
   * Handles input change on the registration form
   * @param {event} event 
   */
  handleInputChange(event) {
    //Grab input vars
    const target = event.target;
    const value = target.value;
    const name = target.name;

    //grab state vars to update
    var tempUserInfo = this.state.tempUserInfo;
    var errors = this.state.errors;

    //update form started
    this.setState({
      formStarted: true,
    });

    //update group in tempUserInfo
    tempUserInfo[[name]] = value;

    /** Validate user info fields */
    if (name === "first_name") {
      this.validateFirstName(value, errors);
    }

    if (name === "last_name") {
      this.validateLastName(value, errors);

      if (value === "") {
        tempUserInfo[[name]] = null;
      }
    }

    if (name === "email") {
      this.validateEmail(value, errors);
    }

    if (name === "password") {
      this.validatePassword(value, errors);
    }

    if (name === "passwordConfirm") {
      var errorCount = 0;

      if (tempUserInfo['password'] !== value) {
        errors[name] = "Passwords do not match";
        errorCount++;
      }

      if (errorCount <= 0) {
        delete errors.passwordConfirm;
      }
    }

    //Check if is an address field
    if (name === "address1" || name === "address2" || name === "city" || name === "state" || name === "zipcode") {

      this.setState({
        addressProvided: true
      });

      if (name === "address1") {
        var errorCountAddress = 0;

        if(value === ""){
          if(this.checkForAddressFields()){
            errors["address1"] = "Address Line 1 must not be blank";
            errorCountAddress++;
          }
        }

        //reset errors if none found
        if (errorCountAddress <= 0) {
          delete errors.address1;
        }
      }

      if (name === "address2") {

        if(value === ""){
          tempUserInfo["address2"] = null;
        }
      }

      if (name === "city") {
        var errorCountCity = 0;

        if(value === ""){
          if(this.checkForAddressFields()){
            errors["city"] = "City must not be blank";
            errorCountCity++;
          }
        }

        //reset errors if none found
        if (errorCountCity <= 0) {
          delete errors.city;
        }
      }

      if (name === "state") {
        var errorCountState = 0;

        if(value === ""){
          if(this.checkForAddressFields()){
            errors["state"] = "State must not be blank";
            errorCountState++;
          }
        }

        //reset errors if none found
        if (errorCountState <= 0) {
          delete errors.state;
        }
      }

      if (name === "zipcode") {
        var errorCountZipcode = 0;

        if(value === ""){
          if(this.checkForAddressFields()){
            errors["zipcode"] = "Zipcode must not be blank";
            errorCountZipcode++;
          }
        }

        //reset errors if none found
        if (errorCountZipcode <= 0) {
          delete errors.zipcode;
        }
      }

      //Check if address provided and delete fields if not
      if(!this.checkForAddressFields()){
        this.setState({
          addressProvided: false
        });
        delete errors.address1;
        delete errors.city;
        delete errors.state;
        delete errors.zipcode;
      }

      this.setState({
        errors: errors
      });
    }

    this.setState({
      tempUserInfo: tempUserInfo
    });
  }

  /**
   * Validates first_name field
   * @param {String} name 
   */
  validateFirstName(name, errors) {
    var errorCount = 0;

    //empty input box
    if (name === "") {
      errors["first_name"] = "First name must not be blank";
      errorCount++;
    }

    //check for alphanumerics
    if (!this.validateAlphanumericName(name)) {
      errors["first_name"] = "First name must contain only alphanumeric characters and hyphens";
      errorCount++;
    }

    //Check if name is longer than 256 chars
    if (name.length > 256) {
      errors["first_name"] = "First Name has a limit of 256 characters";
      errorCount++;
    }

    //reset errors if none found
    if (errorCount <= 0) {
      delete errors.first_name;
    }

    this.setState({
      errors: errors
    });
  }

  /**
   * Validates last_name field
   * @param {String} name 
   */
  validateLastName(name, errors) {
    var errorCount = 0;

    //check for alphanumerics
    if (!this.validateAlphanumericName(name)) {
      errors["last_name"] = "Last name must contain only alphanumeric characters and hyphens";
      errorCount++;
    }

    //Check if name is longer than 256 chars
    if (name.length > 256) {
      errors["last_name"] = "Last Name has a limit of 256 characters";
      errorCount++;
    }

    //reset errors if none found
    if (errorCount <= 0) {
      delete errors.last_name;
    }

    this.setState({
      errors: errors
    });
  }

  /**
   * Validates email field
   * @param {String} email 
   */
  validateEmail(email, errors) {
    var errorCount = 0;

    //empty input box
    if (email === "") {
      errors["email"] = "Email must not be blank";
      errorCount++;
    }

    if (!validator.isEmail(email)) {
      errors["email"] = "Not a valid email";
      errorCount++;
    }

    //reset errors if none found
    if (errorCount <= 0) {
      delete errors.email;
    }

    this.setState({
      errors: errors
    });
  }

  /**
   * Validates password field
   * @param {String} password 
   */
  validatePassword(password, errors) {
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

  /**
   * Validate name fields with alphanumeric regexp
   * Returns true if name matches
   */
  validateAlphanumericName(name) {
    //alphanumeric regexp
    var nameRegExp = new RegExp("^[a-zA-Z-]*$");

    return name.match(nameRegExp);
  }

  /**
   * Checks if address fields were filled out
   * @returns boolean
   */
  checkForAddressFields() {
    var tempUserInfo = this.state.tempUserInfo;

    for(var key in tempUserInfo){
      if(key === "address1" && (tempUserInfo[key] !== null && tempUserInfo[key] !== "")){
        return true;
      }
      if(key === "address2" && (tempUserInfo[key] !== null && tempUserInfo[key] !== "")){
        return true;
      }
      if(key === "city" && (tempUserInfo[key] !== null && tempUserInfo[key] !== "")){
        return true;
      }
      if(key === "state" && (tempUserInfo[key] !== null && tempUserInfo[key] !== "")){
        return true;
      }
      if(key === "zipcode" && (tempUserInfo[key] !== null && tempUserInfo[key] !== "")){
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div className="register-form">
        <Container className="register-container">
          <div className="register-form-container">
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>

              <div className="name-cols">
                <div className="column-1">
                  <Form.Label htmlFor="first_name">First Name *</Form.Label>
                  <Form.Control
                    id="first_name"
                    name="first_name"
                    value={this.state.firstName}
                    onChange={this.handInputChange}
                    type="first_name"
                    placeholder="John"
                  />
                  <p className="text-danger">{this.state.errors.first_name}</p>
                </div>
                <div className="column-2">
                  <Form.Label htmlFor="lastName">Last Name (Optional)</Form.Label>
                  <Form.Control
                    id="last_name"
                    name="last_name"
                    value={this.state.lastName}
                    onChange={this.handInputChange}
                    type="lastName"
                    placeholder="Doe"
                  />
                  <p className="text-danger">{this.state.errors.last_name}</p>
                </div>
              </div>

              <Form.Label htmlFor="email">Email *</Form.Label>
              <Form.Control
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handInputChange}
                type="email"
                placeholder="johndoe@something.com"
              />
              <p className="text-danger">{this.state.errors.email}</p>

              <div className="pass-cols">
                <div className="column-1">
                  <Form.Label htmlFor="password">Password *</Form.Label>
                  <Form.Control
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handInputChange}
                    type="password"
                    placeholder="reallygoodpassword"
                  />
                  <p className="text-danger">{this.state.errors.password}</p>
                </div>
                <div className="column-2">
                  <Form.Label htmlFor="passwordConfirm">Confirm Password *</Form.Label>
                  <Form.Control
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={this.state.passwordConfirm}
                    onChange={this.handInputChange}
                    type="password"
                    placeholder="reallygoodpassword"
                  />
                  <p className="text-danger">{this.state.errors.passwordConfirm}</p>
                </div>
              </div>

              <h4>Address (Optional)</h4>

              <div className="address">

                <Form.Label htmlFor="address1">Address Line 1</Form.Label>
                <Form.Control
                  id="address1"
                  name="address1"
                  value={this.state.address1}
                  onChange={this.handInputChange}
                  type="address1"
                  placeholder="1234 Somewhere Dr"
                />
                <p className="text-danger">{this.state.errors.address1}</p>

                <Form.Label htmlFor="address2">Address Line 2</Form.Label>
                <Form.Control
                  id="address2"
                  name="address2"
                  value={this.state.address2}
                  onChange={this.handInputChange}
                  type="address2"
                  placeholder="Room/Suite/House #1234"
                />

                <div className="address-location-info">
                  <div className="column-1">
                    <Form.Label htmlFor="city">City</Form.Label>
                    <Form.Control
                      id="city"
                      name="city"
                      value={this.state.city}
                      onChange={this.handInputChange}
                      type="city"
                      placeholder="City"
                    />
                    <p className="text-danger">{this.state.errors.city}</p>
                  </div>
                  <div className="column-2">
                    <Form.Label htmlFor="state">State</Form.Label>
                    <Form.Control
                      id="state"
                      name="state"
                      value={this.state.state}
                      onChange={this.handInputChange}
                      type="state"
                      placeholder="State"
                    />
                    <p className="text-danger">{this.state.errors.state}</p>
                  </div>
                  <div className="column-3">
                    <Form.Label htmlFor="zipcode">Zipcode</Form.Label>
                    <Form.Control
                      id="zipcode"
                      name="zipcode"
                      value={this.state.zipcode}
                      onChange={this.handInputChange}
                      type="zipcode"
                      placeholder="12345"
                    />
                    <p className="text-danger">{this.state.errors.zipcode}</p>
                  </div>
                </div>
              </div>
              <p className="text-danger text-center">{this.state.errors.address}</p>

              <div className="button-container">
                <CustomButton buttonText="Register" size="lg" type="submit" />
              </div>
            </form>
            <div className="login-redirect">
              <p className="left-text">Already Have An Account?</p>
              <p><Link to="/login">Login Now</Link></p>
            </div>
          </div>
        </Container>

        {
          this.state.done &&
          <Redirect to="/login" />
        }
      </div>
    );
  }
}

export default Register;