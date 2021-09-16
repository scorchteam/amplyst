import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

/**
 * Renders the main list view for viewing list data
 * @param {object} props 
 * @returns rendered view of list data
 */
const ListView = (props) => {
  const [listData, updateListData] = useState(props.listData);
  /**
   * Renders list data in JSX
   * @param {object} userInfo 
   * @returns rendered list data
   */
  const renderUserInfo = (userInfo) => {
    return (<div><pre>{JSON.stringify(userInfo, null, 2)}</pre></div>);
  }

  /** Updates state held list data when props updates */
  useEffect(() => {
    updateListData(props.listData);
  }, [props.listData]);

  return (
    <div className="list-sub-container-style">
      {!listData && <h4>Select a list on the left hand side</h4>}
      {listData && renderUserInfo(listData)}
    </div>
  );
}

export default withRouter(ListView);