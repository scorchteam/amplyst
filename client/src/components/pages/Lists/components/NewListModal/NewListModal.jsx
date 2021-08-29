import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Form, Modal } from "react-bootstrap";
import { createNewList, validateListType, validateListName, validateListFormData, grabListData } from "./CreateNewList";

import { flask_url } from "../../../../../App";

class NewListModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      listTypeSelected: false,
      errors: {}
    }
  }

  handleSubmit() {
    const formData = this.state.formData;
    const errors = validateListFormData(formData);
    if(Object.keys(errors).length !== 0) {
      this.setState({
        errors: errors
      })
    } else {
      console.log("success!");
      createNewList(formData, localStorage.getItem("token"), flask_url, () => this.props.addNewListToData).then(() => {
        this.props.handleModalShow(false);
        grabListData(flask_url).then((listData) => {
          console.log("listData", listData);
          this.props.updateListData(listData)
        });
      });
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    var formData = this.state.formData;

    formData[[name]] = value;
    
    this.setState({
      formData: formData
    });

    if (name === "listType") {
      const error = validateListType(value);
      if (error !== "") {
        this.setState({listTypeSelected: false});
        this.defineStateError("listType", error);
      } else {
        this.setState({listTypeSelected: true});
        this.defineStateError("listType", undefined)
      }
    }

    if (name === "listName") {
      const error = validateListName(value);
      if (error !== "") {
        this.defineStateError("listName", error);
      } else {
        this.defineStateError("listName", undefined)
      }
    }
  }

  defineStateError(key, error) {
    this.setState({
      errors: {
        [key]: error
      }
    });
  }

  render() {
    return (
      <>
        <Modal
          show={this.props.show && this.props.show}
          onHide={() => this.props.handleModalShow(false)}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a new list</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>List Type</Form.Label>
              <Form.Select  onChange={this.handleChange} name="listType">
                <option value="none">Choose...</option>
                <option value="gift">Gift</option>
                <option value="todo">Todo</option>
                <option value="shopping">Shopping</option>
              </Form.Select>
              <p className="text-danger">{this.state.errors.listType && this.state.errors.listType}</p>
            </Form.Group>
            {
              this.state.listTypeSelected &&
              <Form.Group>
                <Form.Label>List Name</Form.Label>
                <Form.Control type="text" placeholder="List Name" name="listName" onChange={this.handleChange} />
                <p className="text-danger">{this.state.errors.listName && this.state.errors.listName}</p>
                <Form.Label>List Description</Form.Label>
                <Form.Control as="textarea" placeholder="List Description" name="listDescription" onChange={this.handleChange} style={{height: '100px'}} />
              </Form.Group>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.handleModalShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.handleSubmit()}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default withRouter(NewListModal);