import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { ListsSidePanel, ListView, NewListModal } from "./components";
import queryString from 'query-string';
import "./Lists.scss";
import ListsListDropdown from "./components/ListHelpers/ListSelect";
import { CustomHyperlink } from "../../general";
import { getListById, getMinimalListData, grabUserListData } from "../../../lists/ListInterfaces";

/**
 * Computes and renders the /lists page
 * @param {object} props 
 * @returns render of the /lists page
 */
const Lists = (props) => {

  /** State objects */
  const urlVal = queryString.parse(props.location.search);
  const [userListArray, updateUserListArray] = useState(grabUserListData(props.userListData));
  const [listNameList, updateListNameList] = useState(userListArray);
  const [urlVals] = useState(urlVal);
  const [renderListFromUrl, updateRenderListFromUrl] = useState(false);
  const [show, updateShow] = useState(false);
  const [activeList, updateActiveList] = useState(undefined);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    updateListNameList(getMinimalListData(userListArray))
  }, [userListArray]);

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

  useEffect(() => {
    updateListNameList(getMinimalListData(userListArray));
  }, [userListArray])

  return (
    <Container fluid="md">
        <NewListModal handleModalShow={handleModalShow} show={show} updateListData={updateUserListArray}/>
        <div className="lists-container">
        {
          //Check for window being wider than 992px to render widescreen view
          width >= 992 &&
          <>
            <div className="lists-container-col-1">
              <ListsSidePanel lists={listNameList} changeActiveList={changeActiveList} handleModalShow={handleModalShow} updateListData={updateUserListArray}/>
            </div>
            <div className="lists-container-col-2">
              <ListView listData={getListById(userListArray, activeList)}/>
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
                <div className="lists-container-col-2">
                  <ListView listData={getListById(userListArray, activeList)}/>
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
                <ListView listData={getListById(userListArray, activeList)}/>
              </>
            }
          </>
        }
      </div>
    </Container>
  );
}

export default withRouter(Lists);