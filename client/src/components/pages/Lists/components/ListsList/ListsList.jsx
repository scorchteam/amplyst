import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
class ListsList extends Component {

  iterateOutListNames(listNames) {
    if (listNames === null) {
      return <></>;
    }
    return listNames.map((item, index) => (
      <li onClick={() => this.props.changeActiveList(item.listId)} key={index}>{item.listName}</li>
    ))
  }

  render() {
    return (
      <div className="list-sub-container-style">
        <h2>My Lists</h2>
        <ul className="my-lists-list">
          {this.iterateOutListNames(this.props.lists)}
        </ul>
        <Button variant="primary" onClick={() => this.props.handleModalShow(true)}>
            Add a new list
        </Button>
      </div>
    );
  }
}

export default withRouter(ListsList);