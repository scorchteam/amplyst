import React, { Component } from "react";
import { withRouter } from "react-router";
import "./RecentLists.scss";

class RecentLists extends Component {
  render() {
    return (
      <div className="welcome-page-sub-container text-breaking">
        <h5>Recent Lists</h5>
      </div>
    );
  }
}

export default withRouter(RecentLists);