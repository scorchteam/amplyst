import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import { flask_url } from "../../../App";
import { deleteList, getListById, ListArray, ListType } from "../../../lists/ListInterfaces";
import { fetchUserListData } from "../../../UserAuth";
import { User } from "../../../UserInterface";
import ListEditView from "./components/ListEditView";
import ListsSidePanel from "./components/ListsSidePanel";
import ListView from "./components/ListView";
import "./Lists.scss";

/**
 * Computes and renders the /lists page
 * @param {object} props 
 * @returns render of the /lists page
 */
interface ListProps {
  updateUserListData: any,
  history: any,
  location: any,
  logout: any,
  match: any,
  staticContext: any,
  token: string,
  userInfo: User,
  userListData: ListArray,
  activeListId: string,
  updateActiveListId: any,
  activeListData: ListType,
  updateActiveListData: any,
  submitEditedList: any
}
const Lists = (props: ListProps) => {

  const [editView, updateEditView] = useState<Boolean>(false);

  const deleteUserList = async (id: string) => {
    if (props.token) {
      deleteList(flask_url, props.token, id)
        .then(data => {
          if ("success" in data) {
            fetchUserListData(props.token, props.updateUserListData);
            if(props.activeListId === id) {
              props.updateActiveListId(undefined);
              props.updateActiveListData(undefined);
            }
          }
        })
    }
  }

  return (
    <Container fluid="md">
      <div className="lists-container">
        <div className="lists-container-col-1">
          <ListsSidePanel userListData={props.userListData} deleteUserList={deleteUserList} updateActiveListId={props.updateActiveListId} 
          token={props.token}
          updateUserListData={props.updateUserListData} />
        </div>
        <div className="lists-container-col2">
          {
            editView &&
            <ListEditView activeListData={props.activeListData} updateEditView={updateEditView} updateActiveListData={props.updateActiveListData} submitEditedList={props.submitEditedList} updateUserListData={props.updateUserListData} token={props.token} />
          }
          {
            !editView &&
            <ListView activeListData={props.activeListData} updateEditView={updateEditView} />
          }
        </div>
      </div>
    </Container>
  );
}

export default withRouter(Lists);