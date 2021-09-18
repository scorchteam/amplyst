import React from "react";
import { withRouter } from "react-router";
import "./RecentLists.scss";

const RecentLists = (props) => {

  return (
    <div className="welcome-page-sub-container text-breaking">
      <h5>Recent Lists</h5>
      <ul className="recent-lists-list">
      </ul>
    </div>
  );
}

export default withRouter(RecentLists);