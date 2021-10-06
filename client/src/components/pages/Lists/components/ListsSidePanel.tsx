import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { getMinimalListData } from "../../../../lists/ListInterfaces";

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
        console.log(listNames)
        const listMap = listNames.map((item, index) => (
          <div className="list-side-panel-entry" key={index}>
            <li onClick={() => props.changeActiveList(item.id)}>{item.name}</li>
            <div className="delete-container">
              {/* <i className="far fa-times-circle" onClick={() => deleteList(item.listId).then(() => {updateLists(props.updateListData)})}></i> */}
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
        <Button className="custom-button" variant="primary">
            Add a new list
        </Button>
        <ul className="my-lists-list">
          {iterateOutListNames(minimalListData)}
        </ul>
      </div>
    );
  }
  
  export default withRouter(ListsSidePanel);