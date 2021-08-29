import React, { Component } from "react";
import { withRouter } from "react-router";
import "./ProfileSummary.scss";

class ProfileSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.userInfo
    };
  }

  render() {
    return (
      <div className="welcome-page-sub-container text-breaking">
        <h2>Hi {this.state.userInfo && this.state.userInfo.first_name},</h2>
      </div>
    );
  }
}

export default withRouter(ProfileSummary);