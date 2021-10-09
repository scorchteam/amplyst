import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { ListArray, ListType } from "../../../../lists/ListInterfaces";
import { User } from "../../../../UserInterface";
import ListViewItems from "./ListView/ListViewItems";
import ListViewTop from "./ListView/ListViewTop";

interface ListProps {
    history: any,
    location: any,
    match: any,
    staticContext: any,
    activeListData: ListType | undefined,
}
const ListView = (props: ListProps) => {

    const [activeListData, updateActiveListData] = useState<ListType>();

    useEffect(() => {
        updateActiveListData(props.activeListData);
    }, [props.activeListData]);

    return (
        <div className="list-sub-container-style">
            {!activeListData && <h4>Select a list or create a new one</h4>}
            {
                activeListData &&
                <div className="list-view-container">
                    <div className="list-view-top">
                        <ListViewTop listData={activeListData} />
                    </div>
                    <div className="list-view-items">
                        <ListViewItems listData={activeListData} />
                    </div>
                    <div className="list-edit-button-container">
                        Button
                    </div>
                </div>
            }
        </div>
    );
}

export default withRouter(ListView);