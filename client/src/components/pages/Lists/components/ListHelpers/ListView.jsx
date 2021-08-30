import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

/**
 * Renders the main list view for viewing list data
 * @param {object} props 
 * @returns rendered view of list data
 */
const ListView = (props) => {
  const [listData, updateListData] = useState(props.listData);

  /** Updates state held list data when props updates */
  useEffect(() => {
    updateListData(props.listData);
  }, [props.listData]);

  const convertTimeString = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleDateString();
  }

  const getListType = (listType) => {
    if (listType === "shopping") {
      return "Shopping List";
    }
    if (listType === "todo") {
      return "Todo List";
    }
    if (listType === "gift") {
      return "Gift List";
    }
  }

  const convertNumberToPrice = (price) => {
    return ("$" + price); 
  }

  return (
    <div className="list-sub-container-style">
      {!listData && <h4>Select a list on the left hand side</h4>}
      {
        listData &&
        <div className="list-view-container">
          <div className="list-view-meta">
            <p>{getListType(listData.list_type)}</p>
            <p>{convertTimeString(listData.date_created.$date)}</p>
          </div>
          <div className="list-view-header">
            <div className="list-name">
              <h2>{listData.list_name}</h2>
              <div className="list-edit">
                <i className="fas fa-edit"></i>
              </div>
            </div>
            <div className="list-description">
              <p><i>{listData.list_description}</i></p>
            </div>
          </div>
          <div className="list-view-items">
            <ul>
              <li>
                <div className="list-item-header">
                  <p className="list-item-title">Major Awesome Gaming Chair</p>
                  <p className="list-item-price">{convertNumberToPrice(99.99)}</p>
                </div>
                <i><p>This is the most impressive gaming chair to every exist</p></i>
                <a href="https://www.amazon.com">https://www.amazon.com</a>
              </li>
              <li>
                <div className="list-item-header">
                  <p className="list-item-title">New Microphone</p>
                  <p className="list-item-price">{convertNumberToPrice(462.99)}</p>
                </div>
                <i><p>Best microphone ever</p></i>
                <a href="https://www.amazon.com">https://www.amazon.com</a>
              </li>
              <li>
                <div className="list-item-header">
                  <p className="list-item-title">Can of beans</p>
                  <p className="list-item-price">{convertNumberToPrice(9.99)}</p>
                </div>
                <i><p>Just a can of beans</p></i>
                <a href="https://www.amazon.com">https://www.amazon.com</a>
              </li>
              <li>
                <div className="list-item-header">
                  <p className="list-item-title">Water bottles</p>
                  <p className="list-item-price">{convertNumberToPrice(24.98)}</p>
                </div>
                <i><p>I be thirsty</p></i>
                <a href="https://www.amazon.com">https://www.amazon.com</a>
              </li>
              <li>
                <div className="list-item-header">
                  <p className="list-item-title">Brand new television</p>
                  <p className="list-item-price">{convertNumberToPrice(6879.99)}</p>
                </div>
                <i><p>4K ultra uber tv</p></i>
                <a href="https://www.amazon.com">https://www.amazon.com</a>
              </li>
              <li>
                <div className="list-item-header">
                  <p className="list-item-title">iPhone 12</p>
                  <p className="list-item-price">{convertNumberToPrice(999.99)}</p>
                </div>
                <i><p>new iphone</p></i>
                <a href="https://www.amazon.com">https://www.amazon.com</a>
              </li>
              <li>
                <div className="list-item-header">
                  <p className="list-item-title">Major Awesome Gaming Chair</p>
                  <p className="list-item-price">{convertNumberToPrice(99.99)}</p>
                </div>
                <i><p>This is the most impressive gaming chair to every exist</p></i>
                <a href="https://www.amazon.com">https://www.amazon.com</a>
              </li>
              <li>
                <div className="list-item-header">
                  <p className="list-item-title">Major Awesome Gaming Chair</p>
                  <p className="list-item-price">{convertNumberToPrice(99.99)}</p>
                </div>
                <i><p>This is the most impressive gaming chair to every exist</p></i>
                <a href="https://www.amazon.com">https://www.amazon.com</a>
              </li>
            </ul>
          </div>
        </div>
      }
    </div>
  );
}

export default withRouter(ListView);