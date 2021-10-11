import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import { flask_url } from "../../../App";
import { deleteList, getListById, ListArray, ListType } from "../../../lists/ListInterfaces";
import { fetchUserListData } from "../../../UserAuth";
import { User } from "../../../UserInterface";
import ListsSidePanel from "./components/ListsSidePanel";
import ListView from "./components/ListView";
import "./Lists.scss";

/**
 * Computes and renders the /lists page
 * @param {object} props 
 * @returns render of the /lists page
 */
interface ListProps {
  grabUserListData: any,
  history: any,
  location: any,
  logout: any,
  match: any,
  staticContext: any,
  token: string,
  userInfo: User,
  userListData: ListArray
}
const Lists = (props: ListProps) => {

  const [userAuthToken, updateUserAuthToken] = useState<string>();
  const [userInfo, updateUserInfo] = useState<User>();
  const [userListData, updateUserListData] = useState<ListArray>();
  const [activeListId, updateActiveListId] = useState<string>();
  const [activeListData, updateActiveListData] = useState<ListType>();

  useEffect(() => {
    updateUserInfo(props.userInfo);
  }, [props.userInfo]);

  useEffect(() => {
    updateUserListData(props.userListData);
  }, [props.userListData]);

  useEffect(() => {
    updateUserAuthToken(props.token);
  }, [props.token]);

  useEffect(() => {
    if (activeListId && userListData) {
      updateActiveListData(getListById(userListData, activeListId));
    }
  }, [activeListId, userListData]);

  useEffect(() => {
    console.log(userInfo);
  })

  const deleteUserList = async (id: string) => {
    if (userAuthToken) {
      deleteList(flask_url, userAuthToken, id)
        .then(data => {
          if ("success" in data) {
            fetchUserListData(userAuthToken, updateUserListData);
            if(activeListId === id) {
              updateActiveListId(undefined);
              updateActiveListData(undefined);
            }
          }
        })
    }
  }

  return (
    <Container fluid="md">
      <div className="lists-container">
        <div className="lists-container-col-1">
          <ListsSidePanel userListData={userListData} deleteUserList={deleteUserList} updateActiveListId={updateActiveListId} 
          token={props.token}
          grabUserListData={props.grabUserListData} />
        </div>
        <div className="lists-container-col2">
          <ListView activeListData={activeListData} />
        </div>
      </div>
    </Container>
  );
}

export default withRouter(Lists);