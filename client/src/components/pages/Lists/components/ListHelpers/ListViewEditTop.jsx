import React from "react";
import { withRouter } from "react-router";
import { Form } from "react-bootstrap";

const ListViewTop = (props) => {

    const convertTimeString = (timeString) => {
        const date = new Date(timeString)
        return date.toLocaleDateString();
    }

    return (
        <div className="list-view-edit-top">
            <div className="list-view-meta">
                <p>{props.listData.getType()}</p>
                <p>Created on: {convertTimeString(props.listData.getDateCreated())}</p>
            </div>
            <div className="list-view-header">
                <div className="list-name list-name-edit">
                    <Form.Label>List Name</Form.Label>
                    <Form.Control type="text" defaultValue={props.listData.getName()} />
                </div>
                <div className="list-description list-description-edit">
                    <Form.Label>List Description</Form.Label>
                    <Form.Control as="textarea" rows={2} defaultValue={props.listData.getDescription()} />
                </div>
            </div>
        </div>
    );
}

export default withRouter(ListViewTop);