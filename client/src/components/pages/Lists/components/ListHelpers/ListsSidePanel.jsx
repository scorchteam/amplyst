import React, { useState } from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

/**
 * Renders the lists side panel on /lists
 * @param {object} props 
 * @returns render of the list side panel
 */
const ListsSidePanel = (props) => {
  /**
   * Renders list elements of lists
   * @param {array} listNames 
   * @returns render of list elements
   */
  const iterateOutListNames = (listNames) => {
    if (listNames === undefined) {
      return <></>;
    }
    if (listNames.constructor === Array) {
      const listMap = listNames.map((item, index) => (
        <li onClick={() => props.changeActiveList(item.listId)} key={index}>{item.listName}</li>
      ))
      return listMap
    }
    return <></>;
  }

  return (
    <div className="list-sub-container-style">
      <h2>My Lists</h2>
      <ul className="my-lists-list">
        {iterateOutListNames(props.lists)}
      </ul>
      <Button className="custom-button" variant="primary" onClick={() => props.handleModalShow(true)}>
          Add a new list
      </Button>
    </div>
  );
}

export default withRouter(ListsSidePanel);