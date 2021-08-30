import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { ListsSidePanel, ListView, NewListModal } from "./components";
import queryString from 'query-string';
import "./Lists.scss";
import ListsListDropdown from "./components/ListHelpers/ListSelect";
import { CustomHyperlink } from "../../general";

/**
 * Computes and renders the /lists page
 * @param {object} props 
 * @returns render of the /lists page
 */
const Lists = (props) => {

  /**
   * Returns an array of objects that define the name and id of all
   * lists in listsObj
   * @param {object} listsObj 
   * @returns array of objects
   */
  const getListOfLists = (listsObj) => {
    var nameList = []
    for (var key in listsObj) {
      if (listsObj[key] !== undefined && listsObj[key]["_id"] !== undefined) {
        const listId = listsObj[key]["_id"]["$oid"]
        const listName = listsObj[key]["list_name"]
        const listObj = {
          listName: listName,
          listId: listId
        }
        nameList.push(listObj)
      }
    }
    return nameList
  }

  /** State objects */
  const urlVal = queryString.parse(props.location.search);
  const [userListData, updateUserListData] = useState(props.userListData);
  const [listNameList, updateListNameList] = useState(getListOfLists(props.userListData));
  const [urlVals] = useState(urlVal);
  const [renderListFromUrl, updateRenderListFromUrl] = useState(false);
  const [show, updateShow] = useState(false);
  const [activeList, updateActiveList] = useState(undefined);
  const [width, setWidth] = useState(window.innerWidth);

  /** Checks for existence of url query string to render list from url */
  if (urlVals && urlVals.list && urlVals.list !== "" && renderListFromUrl !== true) {
    updateRenderListFromUrl(true);
    updateActiveList(urlVals.list);
  }

  /** Function to handle modal showing */
  const handleModalShow = (boolean) => updateShow(boolean);

  /** Add event listener to track window sizing for mobile */
  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    updateWindowDimensions();

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    }
  }, []);
  
  /** Update state with current window width */
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  }

  /** Function to change the active listId in state */
  const changeActiveList = (listId) => {
    updateActiveList(listId);
  }

  /**
   * Returns list object from userListData based off the key listId
   * @param {string} listId 
   * @returns object
   */
  const getListById = (listId) => {
    var retList = undefined;
    for (var list in userListData) {
      if(userListData[list]["_id"] !== undefined){
        if (userListData[list]["_id"]["$oid"] === listId) {
          retList = userListData[list]
        }
      }
    }
    return retList;
  }

  /**
   * Updates state with new instance of listData for re-render
   * when new list is made
   * @param {object} listData 
   */
  const updateListData = (listData) => {
    updateUserListData([...listData]);
    updateListNameList([...getListOfLists(listData)]);
  }

  return (
    <Container fluid="md">
        <NewListModal handleModalShow={handleModalShow} show={show} updateListData={updateListData}/>
        <div className="lists-container">
        {
          //Check for window being wider than 992px to render widescreen view
          width >= 992 &&
          <>
            <div className="lists-container-col-1">
              <ListsSidePanel lists={listNameList} changeActiveList={changeActiveList} handleModalShow={handleModalShow}/>
            </div>
            <div className="lists-container-col-2">
              <ListView listData={getListById(activeList)}/>
            </div>
          </>
        }

        {
          //Check for mobile screen and render alternate lists view
          width < 992 &&
          <>
            {
              renderListFromUrl &&
              <>
                <CustomHyperlink linkAddress="/lists" hyperlinkText="Go Back" />
                {/* <Link to={"/lists"}>Go Back</Link> */}
                <div className="lists-container-col-2">
                  <ListView listData={getListById(activeList)}/>
                </div>
              </>
            }
            {
              !renderListFromUrl &&
              <>
                <Button variant="primary" onClick={() => handleModalShow(true)}>
                    Add a new list
                </Button>
                <ListsListDropdown lists={listNameList} changeActiveList={changeActiveList} />
                <ListView listData={getListById(activeList)}/>
              </>
            }
          </>
        }
      </div>
    </Container>
  );
}

export default withRouter(Lists);