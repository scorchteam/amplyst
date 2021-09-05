import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import GenericList from "../../../../../lists/GenericList";
import GiftList from "../../../../../lists/GiftList";
import ShoppingList from "../../../../../lists/ShoppingList";
import TodoList from "../../../../../lists/TodoList";
import ListEditViewModal from "./ListEditViewModal";
import GiftListView from "./ListSpecificViews/GiftListView";
import ShoppingListView from "./ListSpecificViews/ShoppingListView";
import TodoListView from "./ListSpecificViews/TodoListView";

/**
 * Renders the main list view for viewing list data
 * @param {object} props 
 * @returns rendered view of list data
 */
const ListView = (props) => {
  const [listData, updateListData] = useState(props.listData);
  const [show, updateShow] = useState(false);

  /** Updates state held list data when props updates */
  useEffect(() => {
    if(props.listData) {
      switch(props.listData.type) {
        case "GIFT":
          updateListData(Object.assign(new GiftList(), props.listData));
          break;
        case "SHOPPING":
          updateListData(Object.assign(new ShoppingList(), props.listData));
          break;
        case "TODO":
          updateListData(Object.assign(new TodoList(), props.listData));
          break;
      }
    }
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
    if (price !== undefined && price !== 0) {
      return ("$" + price); 
    }
  }

  const iterateOutListItems = (listItems) => {
    if (listItems === undefined || listItems.length === 0) {
      return (
        <ul>
          <li id="list-view-first-element" onClick={() => {handleModalShow(true)}}>
            <i className="fas fa-plus"></i>
            <p>Add New Item</p>
          </li>
        </ul>
      );
    }
    return listItems.map((item, index) => (
      <li key={index}>
        <div className="list-item-header">
          <p className="list-item-title">{item.item_name}</p>
          <p className="list-item-price">{convertNumberToPrice(item.item_price)}</p>
        </div>
        <i><p>{item.item_description}</p></i>
        <a href={item.item_link}>{item.item_link}</a>
      </li>
    ));
  }

  /** Function to handle modal showing */
  const handleModalShow = (boolean) => updateShow(boolean);

  return (
    <div className="list-sub-container-style">
      <ListEditViewModal handleModalShow={handleModalShow} show={show} />
      {!listData && <h4>Select a list on the left hand side</h4>}
      {
        listData &&
        <div className="list-view-container">
          <div className="list-view-meta">
            <p>{listData.getType()}</p>
            {/* <p>{getListType(listData.list_type)}</p> */}
            <p>Created on: {convertTimeString(listData.getDateCreated())}</p>
            {/* <p>Created on: {convertTimeString(listData.date_created.$date)}</p> */}
          </div>
          <div className="list-view-header">
            <div className="list-name">
              <h2>{listData.getName()}</h2>
              {/* <h2>{listData.list_name}</h2> */}
              <div className="list-edit">
                <i className="fas fa-edit list-edit-icon" onClick={() => {handleModalShow(true)}}></i>
              </div>
            </div>
            <div className="list-description">
              <p><i>{listData.getDescription()}</i></p>
              {/* <p><i>{listData.list_description}</i></p> */}
            </div>
          </div>
          <div className="list-view-items">
            {
              listData.getType() === "TODO" &&
              <TodoListView listItems={listData} handleModalShow={handleModalShow} />
            }
            {
              listData.getType() === "GIFT" &&
              <GiftListView listItems={listData} handleModalShow={handleModalShow} />
            }
            {
              listData.getType() === "SHOPPING" &&
              <ShoppingListView listItems={listData} handleModalShow={handleModalShow} />
            }
            
            {/* <ul>
              {iterateOutListItems(listData.list_items)}
            </ul> */}
          </div>
        </div>
      }
    </div>
  );
}

export default withRouter(ListView);