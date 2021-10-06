import React from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import { deleteList, updateLists } from "./DeleteList";

/**
 * Renders the lists side panel on /lists
 * @param {object} props 
 * @returns render of the list side panel
 */
const ListsSidePanel = (props) => {
  console.log(props);
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
        <div className="list-side-panel-entry" key={index}>
          <li onClick={() => props.changeActiveList(item.listId)}>{item.listName}</li>
          <div className="delete-container">
            <i className="far fa-times-circle" onClick={() => deleteList(item.listId).then(() => {updateLists(props.updateListData)})}></i>
          </div>
        </div>
      ))
      return listMap
    }
    return <></>;
  }

  return (
    <div className="list-sub-container-style">
      <h2 className="list-side-panel-title">My Lists</h2>
      <Button className="custom-button" variant="primary" onClick={() => props.handleModalShow(true)}>
          Add a new list
      </Button>
      <ul className="my-lists-list">
        {iterateOutListNames(props.lists)}
      </ul>
    </div>
  );
}

export default withRouter(ListsSidePanel);