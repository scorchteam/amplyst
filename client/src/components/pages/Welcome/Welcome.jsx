import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import {
  MessageInbox,
  ProfileSummary,
  RecentActivity,
  RecentList,
  RecentLists,
  UpcomingEvents
  } from "./components";
import "./Welcome.scss";

class Welcome extends Component {

  constructor(props) {
      super(props);
      this.state = {
        dataRecieved: false,
      }

      this.isMountedVal = 0;
  }

  renderUserInfo(userInfo) {
    return (<div><pre>{JSON.stringify(userInfo, null, 2)}</pre></div>);
  }

  render() {
    return (
      <>
        <Container className="welcome-container" fluid="md">
          <div className="column column-1">
            <div className="column-1_section-1">
              <ProfileSummary userInfo={this.props.userInfo} />
              <RecentList />
            </div>
            <div className="column-1_section-2">
              <RecentActivity />
            </div>
          </div>
          <div className="column column-2">
            <MessageInbox />
            <RecentLists userListData={this.props.userListData} />
            <UpcomingEvents />
          </div>
        </Container>
      </>
    );
  }
}

export default withRouter(Welcome);