import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { convertTimeString, getListDescription, getListName, getListType, ListType } from "../../../../lists/ListInterfaces";
import { iterateListItems } from "./ListEditView/ListEditViewHelpers";
import ListEditViewItems from "./ListEditView/ListEditViewItems";
import ListEditViewTop from "./ListEditView/ListEditViewTop";

interface ListProps {
    history: any,
    location: any,
    match: any,
    staticContext: any,
    activeListData: ListType | undefined,
    updateEditView: any
}
const ListEditView = (props: ListProps) => {

    function applyChanges() {
        props.updateEditView(false);
    }

    return (
        <div className="list-sub-container-style">
            {!props.activeListData && <h4>Select a list or create a new one</h4>}
            {
                props.activeListData &&
                <div className="list-view-container">
                    <h1 className="edit-mode-header">Edit Mode</h1>
                    <Form className="list-edit-form">
                        <div className="list-view-top">
                            <div className="list-view-meta">
                                <p>{props.activeListData && getListType(props.activeListData)} LIST</p>
                                <p>Created on: {props.activeListData && props.activeListData.date_created && convertTimeString(props.activeListData.date_created)}</p>
                            </div>
                            <div className="list-view-header">
                                <div className="list-name-edit">
                                    <Form.Label>List Name</Form.Label>
                                    <Form.Control type="text" placeholder={props.activeListData && getListName(props.activeListData)}/>
                                </div>
                                <div className="list-description list-edit-description">
                                    <Form.Label>List Description</Form.Label>
                                    <Form.Control type="text" placeholder={props.activeListData && getListDescription(props.activeListData)}/>
                                </div>
                            </div>
                        </div>
                        <div className="list-view-items list-view-items-edit">
                            <ul>
                                <li id="list-view-first-element">
                                    <i className="fas fa-plus"></i>
                                    <p>Add New Item</p>
                                </li>
                                {iterateListItems(props.activeListData)}
                            </ul>
                        </div>
                        <div className="list-edit-button-container">
                            <Button className="custom-button" variant="primary" onClick={() => applyChanges()}>Apply</Button>
                            <Button className="custom-button" variant="primary" onClick={() => props.updateEditView(false)}>Cancel</Button>
                        </div>
                    </Form>
                </div>
            }
        </div>
    );
}

export default withRouter(ListEditView);