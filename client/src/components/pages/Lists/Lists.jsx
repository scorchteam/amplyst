import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import queryString from 'query-string';
import "./Lists.scss";

class Lists extends Component {

  constructor(props) {
      super(props);
      this.state = {
        userListData: props.userListData,
        urlVals: queryString.parse(props.location.search)
      }

      console.log(this.state)
  }

  renderObject(object) {
    return (<div><pre>{JSON.stringify(object, null, 2)}</pre></div>);
  }

  renderList(userListData, id) {
    var listData = undefined;
    for (var index in userListData) {
      if (userListData[index]._id.$oid === id) {
        listData = userListData[index];
      }
    }
    if (listData !== undefined) {
      return (<div><pre>{JSON.stringify(listData, null, 2)}</pre></div>);
    } else {
      return <div>Does not exist</div>
    }
  }

  renderListIfQueryString() {
    if (this.state.urlVals && this.state.urlVals.list) {
      return this.renderList(this.state.userListData, this.state.urlVals.list);
    }
  }

  render() {
    return (
      <Container>
        <div className="lists-container">
          <div>
            {this.renderObject(this.state.userListData)}
          </div>
          <div>
            {this.renderListIfQueryString()}
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(Lists);