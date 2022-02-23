import { useEffect, useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { withRouter } from "react-router";
import { flask_url } from "../../../../App";
import { createEmptyGiftList, createEmptyShoppingList, createEmptyTodoList, submitNewEmptyList } from "../../../../lists/ListHelpers";
import { getMinimalListData, grabUserListData } from "../../../../lists/ListInterfaces";

/**
 * Renders the lists side panel on /lists
 * @param {object} props 
 * @returns render of the list side panel
 */
const ListsSidePanel = (props: any) => {

  const [minimalListData, updateMinimalListData] = useState<any>();
  // const [newListId, updateNewListId] = useState<string>();

  useEffect(() => {
    updateMinimalListData(getMinimalListData(props.userListData));
  }, [props.userListData]);

  useEffect(() => {
    // console.log(props);
  })

  /**
   * Renders list elements of lists
   * @param {array} listNames 
   * @returns render of list elements
   */
  const iterateOutListNames = (listNames: any) => {
    if (listNames === undefined) {
      return <></>;
    }
    if (listNames.constructor === Array) {
      const listMap = listNames.map((item, index) => (
        <div className="list-side-panel-entry" key={index}>
          <li onClick={() => props.updateActiveListId(item.id)}>{item.name}</li>
          <div className="delete-container">
            <i className="fas fa-trash hover-pointer" onClick={() => { props.deleteUserList(item.id) }}></i>
          </div>
        </div>
      ))
      return listMap
    }
    return <></>;
  }

  const addNewEmptyTodoList = async () => {
    var newEmptyTodoList = createEmptyTodoList();
    const requestData = await submitNewEmptyList(newEmptyTodoList, props.token);
    var submissionId : string = await requestData.id;
    if(submissionId) {
      props.updateActiveListId(submissionId);
      const newUserListData = await grabUserListData(flask_url, props.token);
      props.updateUserListData(newUserListData);
    }
    return submissionId;
  }

  const addNewEmptyGiftList = async () => {
    var newEmptyGiftList = createEmptyGiftList();
    const requestData = await submitNewEmptyList(newEmptyGiftList, props.token);
    var submissionId : string = requestData.id;
    if(submissionId) {
      props.updateActiveListId(submissionId);
      const newUserListData = await grabUserListData(flask_url, props.token);
      props.updateUserListData(newUserListData);
    }
    return submissionId;
  }

  const addNewEmptyShoppingList = async () => {
    var newEmptyShoppingList = createEmptyShoppingList();
    const requestData = await submitNewEmptyList(newEmptyShoppingList, props.token);
    var submissionId : string = requestData.id;
    if(submissionId) {
      props.updateActiveListId(submissionId);
      const newUserListData = await grabUserListData(flask_url, props.token);
      props.updateUserListData(newUserListData);
    }
    return submissionId;
  }

  return (
    <div className="list-sub-container-style my-lists-min-height">
      <h2 className="list-side-panel-title">My Lists</h2>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1" className="custom-button">Add a new list</Dropdown.Toggle>
        <Dropdown.Menu className="custom-dropdown-menu">
          <Dropdown.Item className="custom-dropdown-item" eventKey="1" onClick={() => addNewEmptyTodoList()}>Todo List</Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item" eventKey="2" onClick={() => addNewEmptyGiftList()}>Gift List</Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item" eventKey="3" onClick={() => addNewEmptyShoppingList()}>Shopping List</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <Button className="custom-button" variant="primary" onClick={() => addExampleList(flask_url, props.token, props.updateUserListData)}>
        Add an example list
      </Button> */}
      <ul className="my-lists-list">
        {iterateOutListNames(minimalListData)}
      </ul>
    </div>
  );
}

export default withRouter(ListsSidePanel);