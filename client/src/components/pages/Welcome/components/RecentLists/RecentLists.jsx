import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./RecentLists.scss";

class RecentLists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userListData: props.userListData
    }
    console.log(props);
  }

  renderUserInfo(userListData) {
    return (<div><pre>{JSON.stringify(userListData, null, 3)}</pre></div>);
  }

  countLists(userListData) {
    return userListData.map((item, index) => (
      <Link to={"/lists?list=" + item._id.$oid}><li key={index}>{item.list_name}</li></Link>
    ))
  }

  render() {
    return (
      <div className="welcome-page-sub-container text-breaking">
        <h5>Recent Lists</h5>
        <ul className="recent-lists-list">
          {this.state.userListData && this.countLists(this.state.userListData)}
        </ul>
      </div>
    );
  }
}

export default withRouter(RecentLists);