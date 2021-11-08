import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { ListType } from "../../../../lists/ListInterfaces";
import ListViewItems from "./ListView/ListViewItems";
import ListViewTop from "./ListView/ListViewTop";

interface ListProps {
    history: any,
    location: any,
    match: any,
    staticContext: any,
    activeListData: ListType | undefined,
    updateEditView: any
}
const ListView = (props: ListProps) => {

    return (
        <div className="list-sub-container-style">
            {!props.activeListData && <h4>Select a list or create a new one</h4>}
            {
                props.activeListData &&
                <div className="list-view-container">
                    <div className="list-view-top">
                        <ListViewTop listData={props.activeListData} updateEditView={props.updateEditView} />
                    </div>
                    <div className="list-view-items">
                        <ListViewItems listData={props.activeListData} updateEditView={props.updateEditView} />
                    </div>
                    <div className="list-view-button-container">
                        <Button className="custom-button" variant="primary" onClick={() => props.updateEditView(true)}><div className="custom-edit-button">Edit <i className="fas fa-edit list-edit-icon-small"/></div></Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default withRouter(ListView);