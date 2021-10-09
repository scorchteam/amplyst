import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { getListType, GiftList, GiftListItem, isEmpty, ListItemsType, ListType, ShoppingListItem, TodoListItem } from "../../../../../lists/ListInterfaces";

interface ListProps {
    history: any,
    location: any,
    match: any,
    staticContext: any,
    listData: ListType | undefined,
}
const ListView = (props: ListProps) => {

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
                        <p className="list-item-title">{item.name && item.name}</p>
                        <input type="checkbox" defaultChecked={(item as TodoListItem).is_checked}></input>
                    </div>
                    <i><p>{item.description && item.description}</p></i>
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
                        <p className="list-item-title">{item.name && item.name}</p>
                        <div className="list-item-header-right">
                            <p className="list-item-price">${(item as GiftListItem).price && (item as GiftListItem).price?.toFixed(2)}</p>
                            <input type="checkbox" defaultChecked={(item as GiftListItem).is_bought}></input>
                        </div>
                    </div>
                    <i><p>{item.description && item.description}</p></i>
                    <a href={(item as GiftListItem).link && (item as GiftListItem).link}>{(item as GiftListItem).link && (item as GiftListItem).link}</a>
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
                        <p className="list-item-title">{item.name && item.name}</p>
                        <div className="list-item-header-right">
                            <p className="list-item-price">${(item as ShoppingListItem).price && (item as ShoppingListItem).price?.toFixed(2)}</p>
                            <input type="checkbox" defaultChecked={(item as ShoppingListItem).is_bought}></input>
                        </div>
                    </div>
                    <i><p>{item.description && item.description}</p></i>
                    <a href={(item as ShoppingListItem).link && (item as ShoppingListItem).link} >{(item as ShoppingListItem).link && (item as ShoppingListItem).link}</a>
                    <p>{(item as ShoppingListItem).location && (item as ShoppingListItem).location}</p>
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
            <li id="list-view-first-element">
                <i className="fas fa-plus"></i>
                <p>Add New Item</p>
            </li>
            {iterateListItems()}
        </ul>
    );
}

export default withRouter(ListView);