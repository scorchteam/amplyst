import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { convertTimeString, getListDescription, getListName, getListType, ListType } from "../../../../../lists/ListInterfaces";

interface ListProps {
    history: any,
    location: any,
    match: any,
    staticContext: any,
    listData: ListType | undefined,
    updateEditView: any
}
const ListEditViewTop = (props: ListProps) => {

    const [listData, updateListData] = useState<ListType>();

    console.log(props);

    useEffect(() => {
        if(props.listData) {
            updateListData(props.listData);
        }
    }, [props.listData]);

    return (
        <>
            
        </>
    );
}

export default withRouter(ListEditViewTop);