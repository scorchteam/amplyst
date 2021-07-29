import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import { ListsList, ListView } from "./components";
import queryString from 'query-string';
import "./Lists.scss";

class Lists extends Component {

  constructor(props) {
      super(props);
      this.state = {
        userListData: props.userListData,
        listNameList: this.getListOfLists(props.userListData),
        urlVals: queryString.parse(props.location.search)
      }
  }

  getListOfLists(listsObj) {
    var nameList = []
    for (var key in listsObj) {
      const listId = listsObj[key]["_id"]["$oid"]
      const listName = listsObj[key]["list_name"]
      const listObj = {
        listName: listName,
        listId: listId
      }
      nameList.push(listObj)
    }
    return nameList
  }

  getListDataFromUrl(urlVals) {
    if ("list" in urlVals) {
      return this.getListById(urlVals.list);
    }
  }

  getListById(listId) {
    var retList = undefined;
    for (var list in this.state.userListData) {
      if (this.state.userListData[list]["_id"]["$oid"] === listId) {
        retList = this.state.userListData[list]
      }
    }
    return retList;
  }

  render() {
    return (
      <Container>
        <div className="lists-container">
          <ListsList lists={this.state.listNameList} />
          <ListView listData={this.getListDataFromUrl(this.state.urlVals)} />
        </div>
      </Container>
    );
  }
}

export default withRouter(Lists);