import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { convertTimeString, getListDescription, getListName, getListType, ListType } from "../../../../../lists/ListInterfaces";

interface ListProps {
    history: any,
    location: any,
    match: any,
    staticContext: any,
    listData: ListType | undefined,
}
const ListView = (props: ListProps) => {

    const [listData, updateListData] = useState<ListType>();

    console.log(props);

    useEffect(() => {
        if(props.listData) {
            updateListData(props.listData);
        }
    }, [props.listData]);

    return (
        <>
            <div className="list-view-meta">
                <p>{listData && getListType(listData)} LIST</p>
                <p>Created on: {listData && convertTimeString(listData.date_created)}</p>
            </div>
            <div className="list-view-header">
                <div className="list-name">
                    <h2>{listData && getListName(listData)}</h2>
                    <div className="list-edit">
                        <i className="fas fa-edit list-edit-icon" />
                    </div>
                </div>
                <div className="list-description">
                    <p><i>{listData && getListDescription(listData)}</i></p>
                </div>
            </div>
        </>
    );
}

export default withRouter(ListView);