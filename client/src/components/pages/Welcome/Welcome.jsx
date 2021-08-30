import React, { Component, useState } from "react";
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

/** Renders welcome component */

const Welcome = (props) => {
  return (
    <>
      <Container className="welcome-container" fluid="md">
        <div className="column column-1">
          <div className="column-1_section-1">
            <ProfileSummary userInfo={props.userInfo} />
            <RecentList />
          </div>
          <div className="column-1_section-2">
            <RecentActivity />
          </div>
        </div>
        <div className="column column-2">
          <MessageInbox />
          <RecentLists userListData={props.userListData} />
          <UpcomingEvents />
        </div>
      </Container>
    </>
  );
}

export default withRouter(Welcome);