import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { flask_url } from "../../../../App";
import { addExampleList, getMinimalListData } from "../../../../lists/ListInterfaces";

/**
 * Renders the lists side panel on /lists
 * @param {object} props 
 * @returns render of the list side panel
 */
 const ListsSidePanel = (props : any) => {

    const [minimalListData, updateMinimalListData] = useState<any>();

    useEffect(() => {
        updateMinimalListData(getMinimalListData(props.userListData));
    }, [props.userListData]);

    /**
     * Renders list elements of lists
     * @param {array} listNames 
     * @returns render of list elements
     */
    const iterateOutListNames = (listNames : any) => {
      if (listNames === undefined) {
        return <></>;
      }
      if (listNames.constructor === Array) {
        const listMap = listNames.map((item, index) => (
          <div className="list-side-panel-entry" key={index}>
            <li onClick={() => props.updateActiveListId(item.id)}>{item.name}</li>
            <div className="delete-container">
              <i className="fas fa-trash hover-pointer" onClick={() => {props.deleteUserList(item.id)}}></i>
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
        <p className="text-warning text-center">This is a work in progress and only pre-made lists can be added</p>
        <Button className="custom-button" variant="primary" onClick={() => addExampleList(flask_url, props.token, props.grabUserListData)}>
            Add an example list
        </Button>
        <ul className="my-lists-list">
          {iterateOutListNames(minimalListData)}
        </ul>
      </div>
    );
  }
  
  export default withRouter(ListsSidePanel);