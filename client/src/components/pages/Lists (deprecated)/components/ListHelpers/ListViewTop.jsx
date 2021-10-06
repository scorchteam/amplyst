import React from "react";
import { withRouter } from "react-router";

const ListViewTop = (props) => {

    const convertTimeString = (timeString) => {
        const date = new Date(timeString)
        return date.toLocaleDateString();
    }

    return (
        <>
            <div className="list-view-meta">
                <p>{props.listData.getType()}</p>
                {/* <p>{getListType(listData.list_type)}</p> */}
                <p>Created on: {convertTimeString(props.listData.getDateCreated())}</p>
                {/* <p>Created on: {convertTimeString(listData.date_created.$date)}</p> */}
            </div>
            <div className="list-view-header">
                <div className="list-name">
                    <h2>{props.listData.getName()}</h2>
                    {/* <h2>{listData.list_name}</h2> */}
                    <div className="list-edit">
                        <i className="fas fa-edit list-edit-icon" onClick={() => {props.handleModalShow(true)}}></i>
                    </div>
                </div>
                <div className="list-description">
                    <p><i>{props.listData.getDescription()}</i></p>
                    {/* <p><i>{listData.list_description}</i></p> */}
                </div>
            </div>
        </>
    );
}

export default withRouter(ListViewTop);