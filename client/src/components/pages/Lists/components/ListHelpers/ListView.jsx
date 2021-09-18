import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";
import GiftList from "../../../../../lists/GiftList";
import TodoListItem from "../../../../../lists/ListItems/TodoListItem";
import ShoppingList from "../../../../../lists/ShoppingList";
import TodoList from "../../../../../lists/TodoList";
import GiftListView from "./ListSpecificViews/GiftListView";
import ShoppingListView from "./ListSpecificViews/ShoppingListView";
import TodoListEditView from "./ListSpecificViews/TodoListEditView";
import TodoListView from "./ListSpecificViews/TodoListView";
import ListViewEditTop from "./ListViewEditTop";
import ListViewTop from "./ListViewTop";

/**
 * Renders the main list view for viewing list data
 * @param {object} props 
 * @returns rendered view of list data
 */
const ListView = (props) => {
  const [listData, updateListData] = useState(props.listData);
  const [showEditView, updateShowEditView] = useState(false);
  // const [show, updateShow] = useState(false);

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
        default:
          break;
      }
    }
  }, [props.listData]);

  const addNewListItem = (listType) => {
    console.log(listData);
    if (listType === "TODO") {
      var newListData = Object.assign(new TodoList(), listData);
      var newListItemsArray = newListData.getListItemsArray();
      console.log(newListItemsArray);
      newListItemsArray.push(new TodoListItem("", ""));
      newListData.setListItemsArray(newListItemsArray);
      updateListData(newListData);
    }
    // updateListData(newListData);
  }

  /** Function to handle modal showing */
  const handleModalShow = (boolean) => updateShowEditView(boolean);

  return (
    <div className="list-sub-container-style">
      {!listData && <h4>Select a list on the left hand side</h4>}
      {
        listData &&
        <div className="list-view-container">
          <div className="list-view-top">
            {
              showEditView &&
              <ListViewEditTop listData={listData} handleModalShow={updateShowEditView} />
            }
            {
              !showEditView &&
              <ListViewTop listData={listData} handleModalShow={updateShowEditView} />
            }
          </div>
          <div className="list-view-items">
            {
              listData.getType() === "TODO" &&
              showEditView &&
              <TodoListEditView listItems={listData} handleModalShow={addNewListItem} />
            }
            {
              listData.getType() === "TODO" &&
              !showEditView &&
              <TodoListView listItems={listData} handleModalShow={updateShowEditView} />
            }
            {
              listData.getType() === "GIFT" &&
              <GiftListView listItems={listData} handleModalShow={handleModalShow} />
            }
            {
              listData.getType() === "SHOPPING" &&
              <ShoppingListView listItems={listData} handleModalShow={handleModalShow} />
            }
          </div>
          <div className="list-edit-button-container">
            {
              showEditView &&
              <Button className="custom-button" onClick={() => handleModalShow(false)}>
                Cancel
              </Button>
            }
            {
              showEditView &&
              <Button className="custom-button" onClick={() => handleModalShow(false)}>
                Apply
              </Button>
            }
          </div>
        </div>
      }
    </div>
  );
}

export default withRouter(ListView);