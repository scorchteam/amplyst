import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import "./Welcome.scss";

import { flask_url } from "../../../App";

class Welcome extends Component {

  constructor(props) {
      super(props);
      this.state = {
        dataRecieved: false,
        userInfo: {}
      }

      this.isMountedVal = 0;

      //console.log(this.props);
  }

  async componentDidMount(){
    this.isMountedVal = 1;

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token,
                'Origin': flask_url },
    };

    //console.log(requestOptions);

    const response = await fetch(flask_url + "/api/user/retrieveUserInfo", requestOptions);
    const responseJSON = await response.json();

    if(this.isMountedVal === 1){
      this.setState({
        dataRecieved: false,
        userInfo: responseJSON
      });
    }
  }

  componentWillUnmount() {
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
            Left Column
          </div>
          <div className="column column-2">
            Body
          </div>
        </Container>
      </>
    );
  }
}

export default withRouter(Welcome);