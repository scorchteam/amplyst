import { Form } from "react-bootstrap";
import { getListType, GiftListItem, isEmpty, ListItemsType, ListType, ShoppingListItem, TodoListItem } from "../../../../../lists/ListInterfaces";

export const iterateTodoListItems = (listItems: ListItemsType[]) => {
    if (listItems) {
        return listItems.map((item, index) => (
            <li key={index} id="edit-list-item">
                <div className="list-item-data-container">
                    <div className="edit-list-item-header">
                        <div className="edit-list-item-title">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder={item.name && item.name} />
                        </div>
                        {/* <p className="list-item-title">{item.name && item.name}</p> */}
                        <div className="edit-list-todo-checkbox">
                            {/* Finished: */}
                            <b><Form.Check type="checkbox" label="Finished" defaultChecked={(item as TodoListItem).is_checked} /></b>
                            {/* <input type="checkbox" defaultChecked={(item as TodoListItem).is_checked}></input>  */}
                        </div>
                    </div>
                    <b><Form.Label>Item Description</Form.Label></b>
                    <Form.Control as="textarea" placeholder={item.description && item.description} />
                </div>

                <div className="edit-list-delete-item hover-pointer">
                    <i className="fas fa-trash"></i>Delete Item
                </div>
            </li>
        ));
    }
    return <></>;
}

export const iterateGiftListItems = (listItems: ListItemsType[]) => {
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
            </li>
        ))
    }
    return <></>;
}

export const iterateShoppingListItems = (listItems: ListItemsType[]) => {
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

export const iterateListItems = (listData: ListType) => {
    if (listData && isEmpty(listData)) {
        return (
            <></>
        );
    }
    var listType: string | undefined = undefined;
    if (listData) {
        listType = getListType(listData);
    }
    if (listType) {
        switch (listType) {
            case "GIFT":
                return iterateGiftListItems(listData.list_items);
            case "SHOPPING":
                return iterateShoppingListItems(listData.list_items);
            case "TODO":
                return iterateTodoListItems(listData.list_items);
            default:
                return <></>;
        }
    }
    return <></>;
}