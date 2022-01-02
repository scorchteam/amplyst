import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { convertTimeString, getListDescription, getListName, getListType, ListItemsType, ListType } from "../../../../lists/ListInterfaces";
import { addNewListItemAndPut } from "../../../../lists/ListHelpers";
import { fetchUserListData } from "../../../../UserAuth";
import { handleInputChange, iterateListItems } from "./ListEditView/ListEditViewHelpers";

interface ListProps {
    history: any,
    location: any,
    match: any,
    staticContext: any,
    activeListData: ListType,
    updateEditView: any,
    updateActiveListData: any,
    submitEditedList: any,
    updateUserListData: any,
    token: string
}
const ListEditView = (props: ListProps) => {

    const [activeListEdit, updateActiveListEdit] = useState<ListType>();
    const [finalizedListEdit, updateFinalizedListEdit] = useState<ListType>();

    useEffect(() => {
        updateActiveListEdit(JSON.parse(JSON.stringify(props.activeListData)));
    }, [props.activeListData]);

    useEffect(() => {
        console.log("New active list data", activeListEdit);
        // props.submitEditedList(activeListEdit);
    }, [activeListEdit])

    useEffect(() => {
        props.submitEditedList(finalizedListEdit);
    }, [finalizedListEdit, props]);

    function applyChanges() {
        props.updateEditView(false);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(event);
        updateFinalizedListEdit(activeListEdit);
    }

    function resetEdit() {
        props.updateActiveListData(JSON.parse(JSON.stringify(props.activeListData)));
        props.updateEditView(false)
    }

    function addNewEmptyItem() {
        props.updateEditView(true);
        let newItem : ListItemsType = {
            item_name: "Blank Item"
        }
        if (activeListEdit && activeListEdit.list_name) {
            let copyOfActiveListEdit : ListType = {...activeListEdit};
            copyOfActiveListEdit.list_items.unshift(newItem);
            updateActiveListEdit(JSON.parse(JSON.stringify(copyOfActiveListEdit)));
        }
        // addNewListItemAndPut(activeListEdit, props.token);
        // fetchUserListData(props.token, props.updateUserListData);
        // props.updateEditView(true);
    }

    return (
        <div className="list-sub-container-style">
            {!props.activeListData && <h4>Select a list or create a new one</h4>}
            {
                props.activeListData &&
                <div className="list-view-container">
                    <h1 className="edit-mode-header">Edit Mode</h1>
                    <Form className="list-edit-form" onSubmit={handleSubmit}>
                        <div className="list-view-top">
                            <div className="list-view-meta">
                                <p>{props.activeListData && getListType(props.activeListData)} LIST</p>
                                <p>Created on: {props.activeListData && props.activeListData.date_created && convertTimeString(props.activeListData.date_created)}</p>
                            </div>
                            <div className="list-view-header">
                                <div className="list-name-edit">
                                    <Form.Label htmlFor="list_name">List Name</Form.Label>
                                    <Form.Control id="list_name" name="list_name" type="text" onChange={(event) => {
                                        activeListEdit &&
                                            handleInputChange(event, activeListEdit, updateActiveListEdit);
                                    }} placeholder={props.activeListData && getListName(props.activeListData)} />
                                </div>
                                <div className="list-description list-edit-description">
                                    <Form.Label htmlFor="list_description">List Description</Form.Label>
                                    <Form.Control id="list_description" name="list_description" onChange={(event) => {
                                        activeListEdit &&
                                            handleInputChange(event, activeListEdit, updateActiveListEdit);
                                    }} type="text" placeholder={props.activeListData && getListDescription(props.activeListData)} />
                                </div>
                            </div>
                        </div>
                        <div className="list-view-items list-view-items-edit">
                            <ul>
                                <li id="list-view-first-element" onClick={() => addNewEmptyItem()}>
                                    <i className="fas fa-plus"></i>
                                    <p>Add New Item</p>
                                </li>
                                {activeListEdit && iterateListItems(props.activeListData, activeListEdit, updateActiveListEdit)}
                            </ul>
                        </div>
                        <div className="list-edit-button-container">
                            <Button className="custom-button" variant="primary" type="submit">Apply</Button>
                            <Button className="custom-button" variant="primary" onClick={() => resetEdit()}>Cancel</Button>
                        </div>
                    </Form>
                </div>
            }
        </div>
    );
}

export default withRouter(ListEditView);