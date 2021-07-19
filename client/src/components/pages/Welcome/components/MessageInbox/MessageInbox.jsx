import React, { Component } from "react";
import { withRouter } from "react-router";
import "./MessageInbox.scss";

class MessageInbox extends Component {

  render() {
    return (
      <div className="welcome-page-sub-container text-breaking">
        <h5>Message Inbox</h5>
      </div>
    );
  }
}

export default withRouter(MessageInbox);