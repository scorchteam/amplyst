import React, { Component } from "react";
import { withRouter } from "react-router";
import "./RecentList.scss";

class RecentList extends Component {

  render() {
    return (
      <div className="welcome-page-sub-container text-breaking">
        <h1>Recent List</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quidem praesentium commodi aut obcaecati, atque cumque voluptatibus voluptas temporibus repellendus mollitia ut, reiciendis odio expedita corrupti aperiam eligendi culpa impedit.</p>
      </div>
    );
  }
}

export default withRouter(RecentList);