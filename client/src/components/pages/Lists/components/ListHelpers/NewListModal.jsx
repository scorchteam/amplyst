import React, { Component, useState } from "react";
import { withRouter } from "react-router";
import { Button, Form, Modal } from "react-bootstrap";
import { createNewList, validateListType, validateListName, validateListFormData, grabListData } from "./CreateNewList";

import { flask_url } from "../../../../../App";

/**
 * Renders List modal for creating new lists
 * @param {object} props 
 * @returns rendered list modal
 */
const NewListModal = (props) => {
  const [formData, updateFormData] = useState({});
  const [listTypeSelected, updateListTypeSelected] = useState(false);
  const [errors, updateErrors] = useState({});

  /** Handles submission of new list modal */
  const handleSubmit = () => {
    const localFormData = formData;
    const errors = validateListFormData(localFormData);
    //Checks list validation for errors
    if(Object.keys(errors).length !== 0) {
      updateErrors(errors);
    } else {
      //Creates new list using helper methods
      createNewList(localFormData, localStorage.getItem("token"), flask_url, () => props.addNewListToData).then(() => {
        props.handleModalShow(false);
        grabListData(flask_url).then((listData) => {
          props.updateListData(listData);
        })
      })
    }
  }

  /**
   * Grabs form data from HTML to update form data
   * @param {HTML element} e 
   */
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    var localFormData = formData;

    //Grab form element in question
    localFormData[[name]] = value;
    //Call helper to update form data
    updateFormData(localFormData);
    //Check for errors and update
    if (name === "listType") {
      const error = validateListType(value);
      if (error !== "") {
        updateListTypeSelected(false);
        defineStateError("listType", error);
      } else {
        updateListTypeSelected(true);
        defineStateError("listType", undefined);
      }
    }
    //Check for errors and update
    if (name === "listName") {
      const error = validateListName(value);
      if (error !== "") {
        defineStateError("listName", error);
      } else {
        defineStateError("listName", undefined);
      }
    }
  }

  /**
   * Helper function to define an error and
   * add it to the state error object
   * @param {string} key 
   * @param {string} error 
   */
  const defineStateError = (key, error) => {
    var localErrors = errors;
    localErrors[key] = error;
    updateErrors(localErrors);
  }

  return (
    <>
      <Modal
        show={props.show && props.show}
        onHide={() => props.handleModalShow(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a new list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>List Type</Form.Label>
            <Form.Select  onChange={handleChange} name="listType">
              <option value="none">Choose...</option>
              <option value="gift">Gift</option>
              <option value="todo">Todo</option>
              <option value="shopping">Shopping</option>
            </Form.Select>
            <p className="text-danger">{errors.listType && errors.listType}</p>
          </Form.Group>
          {
            listTypeSelected &&
            <Form.Group>
              <Form.Label>List Name</Form.Label>
              <Form.Control type="text" placeholder="List Name" name="listName" onChange={handleChange} />
              <p className="text-danger">{errors.listName && errors.listName}</p>
              <Form.Label>List Description</Form.Label>
              <Form.Control as="textarea" placeholder="List Description" name="listDescription" onChange={handleChange} style={{height: '100px'}} />
            </Form.Group>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.handleModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default withRouter(NewListModal);