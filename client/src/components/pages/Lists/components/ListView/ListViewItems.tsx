import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { getListType, GiftListItem, isEmpty, ListItemsType, ListType, ShoppingListItem, TodoListItem } from "../../../../../lists/ListInterfaces";

interface ListProps {
    history: any,
    location: any,
    match: any,
    staticContext: any,
    listData: ListType | undefined,
    updateEditView: any
}
const ListViewItems = (props: ListProps) => {

    const [listData, updateListData] = useState<ListType>();
    const [listItems, updateListItems] = useState<ListItemsType[]>();

    useEffect(() => {
        if(props.listData) {
            updateListData(props.listData);
        }
    }, [props.listData]);

    useEffect(() => {
        if (listData && listData.list_items) {
            updateListItems(listData.list_items);
        }
    }, [listData]);

    const iterateTodoListItems = () => {
        if (listItems) {
            return listItems.map((item, index) => (
                <li key={index}>
                    <div className="list-item-header">
                        <p className="list-item-title">{item.item_name && item.item_name}</p>
                        <input type="checkbox" defaultChecked={(item as TodoListItem).item_is_checked}></input>
                    </div>
                    <i><p>{item.item_description && item.item_description}</p></i>
                </li>
            ));
        }
        return <></>;
    }

    const iterateGiftListItems = () => {
        if (listItems) {
            return listItems.map((item, index) => (
                <li key={index}>
                    <div className="list-item-header">
                        <p className="list-item-title">{item.item_name && item.item_name}</p>
                        <div className="list-item-header-right">
                            <p className="list-item-price">${(item as GiftListItem).item_price && (item as GiftListItem).item_price?.toFixed(2)}</p>
                            <input type="checkbox" defaultChecked={(item as GiftListItem).item_is_bought}></input>
                        </div>
                    </div>
                    <i><p>{item.item_description && item.item_description}</p></i>
                    <a href={(item as GiftListItem).item_link && (item as GiftListItem).item_link}>{(item as GiftListItem).item_link && (item as GiftListItem).item_link}</a>
                    {/* <p>boughtBy: {(item as GiftListItem).bought_by_name && (item as GiftListItem).bought_by_name}</p> */}
                </li>
            ))
        }
        return <></>;
    }

    const iterateShoppingListItems = () => {
        if (listItems) {
            return listItems.map((item, index) => (
                <li key={index}>
                    <div className="list-item-header">
                        <p className="list-item-title">{item.item_name && item.item_name}</p>
                        <div className="list-item-header-right">
                            <p className="list-item-price">${(item as ShoppingListItem).item_price && (item as ShoppingListItem).item_price?.toFixed(2)}</p>
                            <input type="checkbox" defaultChecked={(item as ShoppingListItem).item_is_bought}></input>
                        </div>
                    </div>
                    <i><p>{item.item_description && item.item_description}</p></i>
                    <a href={(item as ShoppingListItem).item_link && (item as ShoppingListItem).item_link} >{(item as ShoppingListItem).item_link && (item as ShoppingListItem).item_link}</a>
                    <p>{(item as ShoppingListItem).item_location && (item as ShoppingListItem).item_location}</p>
                </li>
            ))
        }
        return <></>;
    }

    const iterateListItems = () => {
        if (listData && isEmpty(listData)) {
            return (
                <></>
            );
        }
        var listType : string | undefined = undefined;
        if (listData) {
            listType = getListType(listData);
        }
        if (listType) {
            switch(listType) {
                case "GIFT":
                    return iterateGiftListItems();
                case "SHOPPING":
                    return iterateShoppingListItems();
                case "TODO":
                    return iterateTodoListItems();
                default:
                    return <></>;
            }
        }
        return <></>;
    }

    return (
        <ul>
            <li id="list-view-first-element" onClick={() => props.updateEditView(true)}>
                <i className="fas fa-plus"></i>
                <p>Add New Item</p>
            </li>
            {iterateListItems()}
        </ul>
    );
}

export default withRouter(ListViewItems);