import React, { Component } from "react";
import { withRouter } from "react-router";

class ListView extends Component {

  constructor(props) {
      super(props);
      this.state = {
        listData: props.listData
      }
  }

  renderUserInfo(userInfo) {
    return (<div><pre>{JSON.stringify(userInfo, null, 2)}</pre></div>);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        listData: this.props.listData
      });
    }
  }

  render() {
    return (
      <div className="list-sub-container-style">
        {!this.state.listData && <h4>Select a list on the left hand side</h4>}
        {this.state.listData && this.renderUserInfo(this.state.listData)}
      </div>
    );
  }
}

export default withRouter(ListView);