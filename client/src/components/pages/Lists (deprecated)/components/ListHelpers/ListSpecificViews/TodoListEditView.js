import React from "react";
import { withRouter } from "react-router";
import { Form } from "react-bootstrap";

const TodoListEditView = (props) => {
    const iterateTodoListItems = (listItems) => {
        return listItems.map((item, index) => (
            <li key={index}>
                <Form.Label>Item Name</Form.Label>
                <div className="list-item-header">
                    {/* <p className="list-item-title">{item.getName()}</p> */}
                    {/* <input type="text" defaultValue={item.getName()} /> */}
                    {/* <input type="checkbox"></input> */}
                    <Form.Control type="text" defaultValue={item.getName()} />
                </div>
                {/* <i><p>{item.getDescription()}</p></i> */}
                <Form.Label>Description</Form.Label>
                {/* <label> Description </label> */}
                <div>
                    {/* <input type="text" defaultValue={item.getDescription()} /> */}
                    <Form.Control as="textarea" rows={1} defaultValue={item.getDescription()} />
                </div>   
            </li>
        ))
    }

    return (
        <>
            <ul className="list-edit-styles">
                {iterateTodoListItems(props.listItems.getListItemsArray())}
                <li id="list-view-first-element" onClick={() => props.handleModalShow("TODO")}>
                    <i className="fas fa-plus"></i>
                    <p>Add New Item</p>
                </li>
            </ul>
        </>
        
    );
}

export default withRouter(TodoListEditView);