import React, {useState} from "react";
import { withRouter } from "react-router";
import { Button, Form, Modal } from "react-bootstrap";

const ListEditViewModal = (props) => {
    const [errors, updateErrors] = useState({});

    return (
      <>
        <Modal
          show={props.show && props.show}
          onHide={() => props.handleModalShow(false)}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>List Type</Form.Label>
              <Form.Select name="listType">
                <option value="none">Choose...</option>
                <option value="gift">Gift</option>
                <option value="todo">Todo</option>
                <option value="shopping">Shopping</option>
              </Form.Select>
              <p className="text-danger">{errors.listType && errors.listType}</p>
            </Form.Group>
            {
              <Form.Group>
                <Form.Label>List Name</Form.Label>
                <Form.Control type="text" placeholder="List Name" name="listName" />
                <p className="text-danger">{errors.listName && errors.listName}</p>
                <Form.Label>List Description</Form.Label>
                <Form.Control as="textarea" placeholder="List Description" name="listDescription" style={{height: '100px'}} />
              </Form.Group>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.handleModalShow(false)}>
              Close
            </Button>
            <Button variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default withRouter(ListEditViewModal)