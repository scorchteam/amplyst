import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import { withRouter } from "react-router";
import { ListArray } from "../../../lists/ListInterfaces";
import { User } from "../../../UserInterface";
import ListsSidePanel from "./components/ListsSidePanel";
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
const Lists = (props : ListProps) => {

  const [userAuthToken, updateUserAuthToken] = useState<String>();
  const [userInfo, updateUserInfo] = useState<User>();
  const [userListData, updateUserListData] = useState<ListArray>();

  useEffect(() => {
    updateUserInfo(props.userInfo);
  }, [props.userInfo]);

  useEffect(() => {
    updateUserListData(props.userListData);
  }, [props.userListData]);

  useEffect(() => {
    updateUserAuthToken(props.token);
  }, [props.token]);

  return (
    <Container fluid="md">
      <div className="lists-container">
        <div className="lists-container-col-1">
          <ListsSidePanel userListData={userListData}/>
        </div>
        <div className="lists-container-vol2">
        </div>
      </div>
    </Container>
  );
}

export default withRouter(Lists);