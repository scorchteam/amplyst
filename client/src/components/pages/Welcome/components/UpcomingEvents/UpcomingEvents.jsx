import React, { Component } from "react";
import { withRouter } from "react-router";
import "./UpcomingEvents.scss";

class UpcomingEvents extends Component {

  render() {
    return (
      <div className="welcome-page-sub-container text-breaking">
        <h5>Upcoming Events</h5>
      </div>
    );
  }
}

export default withRouter(UpcomingEvents);