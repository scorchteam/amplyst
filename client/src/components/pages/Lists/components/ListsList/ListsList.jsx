import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class ListsList extends Component {

  constructor(props) {
      super(props);
      this.state = {
        listNames: props.lists
      }
  }

  iterateOutListNames(listNames) {
    return listNames.map((item, index) => (
      <Link key={index} to={"/lists?list=" + item.listId}><li>{item.listName}</li></Link>
    ))
  }

  render() {
    return (
      <div className="list-sub-container-style">
        <h2>My Lists</h2>
        <ul className="my-lists-list">
          {this.iterateOutListNames(this.state.listNames)}
        </ul>
      </div>
    );
  }
}

export default withRouter(ListsList);