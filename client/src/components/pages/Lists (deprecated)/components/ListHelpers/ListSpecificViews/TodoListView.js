import React from "react";
import { withRouter } from "react-router";

const TodoListView = (props) => {
    const iterateTodoListItems = (listItems) => {
        if (listItems === undefined || listItems.length === 0) {
            return (
                <li id="list-view-first-element" onClick={() => props.handleModalShow(true)}>
                    <i className="fas fa-plus"></i>
                    <p>Add New Item</p>
                </li>
            );
        }
        return listItems.map((item, index) => (
            <li key={index}>
                <div className="list-item-header">
                    <p className="list-item-title">{item.getName()}</p>
                    <input type="checkbox"></input>
                </div>
                <i><p>{item.getDescription()}</p></i>
            </li>
        ))
    }

    return (
        <ul>
            {iterateTodoListItems(props.listItems.getListItemsArray())}
        </ul>
    );
}

export default withRouter(TodoListView);