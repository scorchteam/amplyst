import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { ListsSidePanel, ListView, NewListModal } from "./components";
import queryString from 'query-string';
import "./Lists.scss";
import ListsListDropdown from "./components/ListHelpers/ListSelect";
import { CustomHyperlink } from "../../general";
import ListArray from "../../../lists/ListArray";

/**
 * Computes and renders the /lists page
 * @param {object} props 
 * @returns render of the /lists page
 */
const Lists = (props) => {

  /** State objects */
  const urlVal = queryString.parse(props.location.search);
  const [userListArray, updateUserListArray] = useState(new ListArray(props.userListData));
  // const [userListData] = useState(props.userListData);
  const [listNameList, updateListNameList] = useState(userListArray.getMinimalListData());
  // const [listNameList, updateListNameList] = useState(getListOfLists(props.userListData));
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

  useEffect(() => {
    updateListNameList(userListArray.getMinimalListData());
  }, [userListArray])

  return (
    <Container fluid="md">
        <NewListModal handleModalShow={handleModalShow} show={show} updateListData={updateUserListArray}/>
        {/* <NewListModal handleModalShow={handleModalShow} show={show} updateListData={updateListData}/> */}
        <div className="lists-container">
        {
          //Check for window being wider than 992px to render widescreen view
          width >= 992 &&
          <>
            <div className="lists-container-col-1">
              <ListsSidePanel lists={listNameList} changeActiveList={changeActiveList} handleModalShow={handleModalShow} updateListData={updateUserListArray}/>
              {/* <ListsSidePanel lists={listNameList} changeActiveList={changeActiveList} handleModalShow={handleModalShow} updateListData={updateListData}/> */}
            </div>
            <div className="lists-container-col-2">
              <ListView listData={userListArray.getListById(activeList)}/>
              {/* <ListView listData={getListById(activeList)}/> */}
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
                  <ListView listData={userListArray.getListById(activeList)}/>
                  {/* <ListView listData={getListById(activeList)}/> */}
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
                <ListView listData={userListArray.getListById(activeList)}/>
                {/* <ListView listData={getListById(activeList)}/> */}
              </>
            }
          </>
        }
      </div>
    </Container>
  );
}

export default withRouter(Lists);