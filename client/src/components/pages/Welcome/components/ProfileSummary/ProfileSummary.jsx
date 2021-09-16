import React, { useState } from "react";
import { withRouter } from "react-router";
import "./ProfileSummary.scss";

const ProfileSummary = (props) => {
  const [userInfo] = useState(props.userInfo);

  return (
    <div className="welcome-page-sub-container text-breaking">
      <h2>Hi {userInfo && userInfo.first_name},</h2>
    </div>
  );
}

export default withRouter(ProfileSummary);