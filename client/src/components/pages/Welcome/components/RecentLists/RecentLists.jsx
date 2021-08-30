import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./RecentLists.scss";

const RecentLists = (props) => {
  const [userListData] = useState(props.userListData);

  const countLists = (userListData) => {
    return userListData.map((item, index) => (
      <Link key={index} to={"/lists?list=" + item._id.$oid}><li>{item.list_name}</li></Link>
    ))
  }

  return (
    <div className="welcome-page-sub-container text-breaking">
      <h5>Recent Lists</h5>
      <ul className="recent-lists-list">
        {userListData && countLists(userListData)}
      </ul>
    </div>
  );
}

export default withRouter(RecentLists);