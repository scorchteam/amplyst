import { Form } from "react-bootstrap";
import { getListType, GiftListItem, isEmpty, ListItemsType, ListType, ShoppingListItem, TodoList, TodoListItem } from "../../../../../lists/ListInterfaces";

export const iterateTodoListItems = (listItems: ListItemsType[], activeListEdit : ListType, updateActiveListEdit : any) => {
    if (listItems) {
        return listItems.map((item, index) => (
            <li key={index} id="edit-list-item">
                <div className="list-item-data-container">
                    <div className="edit-list-item-header">
                        <div className="edit-list-item-title">
                            <Form.Label htmlFor={"todo_item_name_" + index}>Item Name</Form.Label>
                            <Form.Control id={"todo_item_name_" + index} name={"todo_item_name_" + index} onChange={(event) => {
                                        activeListEdit &&
                                        handleInputChange(event, activeListEdit, updateActiveListEdit);
                                    }} type="text" placeholder={item.item_name && item.item_name} />
                        </div>
                        {/* <p className="list-item-title">{item.name && item.name}</p> */}
                        <div className="edit-list-delete-item hover-pointer">
                            <i className="fas fa-trash"></i>Delete Item
                        </div>
                    </div>
                    <b><Form.Label htmlFor={"todo_item_description_" + index}>Item Description</Form.Label></b>
                    <Form.Control id={"todo_item_description_" + index} name={"todo_item_description_" + index} as="textarea" onChange={(event) => {
                                        activeListEdit &&
                                        handleInputChange(event, activeListEdit, updateActiveListEdit);
                                    }} placeholder={item.item_description && item.item_description} />
                </div>
                <div className="edit-list-todo-checkbox">
                    <b><Form.Check id={"todo_item_checkbox_" + index} name={"todo_item_checkbox_" + index} type="checkbox" onChange={(event) => {
                                        activeListEdit &&
                                        handleInputChange(event, activeListEdit, updateActiveListEdit);
                                    }} label="Finished" defaultChecked={(item as TodoListItem).item_is_checked} /></b>
                </div>
                {/* <div className="edit-list-delete-item hover-pointer">
                    <i className="fas fa-trash"></i>Delete Item
                </div> */}
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
                    <p className="list-item-title">{item.item_name && item.item_name}</p>
                    <div className="list-item-header-right">
                        <p className="list-item-price">${(item as GiftListItem).item_price && (item as GiftListItem).item_price?.toFixed(2)}</p>
                        <input type="checkbox" defaultChecked={(item as GiftListItem).item_is_bought}></input>
                    </div>
                </div>
                <i><p>{item.item_description && item.item_description}</p></i>
                <a href={(item as GiftListItem).item_link && (item as GiftListItem).item_link}>{(item as GiftListItem).item_link && (item as GiftListItem).item_link}</a>
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

export const iterateListItems = (listData: ListType, activeListEdit : ListType, updateActiveListEdit : any) => {
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
                return iterateTodoListItems(listData.list_items, activeListEdit, updateActiveListEdit);
            default:
                return <></>;
        }
    }
    return <></>;
}

export const handleInputChange = (event: any, activeListEdit : ListType, updateActiveListEdit : any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let copyOfActiveListEdit = {...activeListEdit};

    if(name === "list_name") {
        copyOfActiveListEdit.list_name = value;
    }

    if(name === "list_description") {
        copyOfActiveListEdit.list_description = value;
    }

    if(name.includes("todo")) {
        copyOfActiveListEdit = handleTodoItemInputChange(name, value, target, copyOfActiveListEdit);
    }

    updateActiveListEdit(copyOfActiveListEdit);

    // console.log(event, activeListEdit);
}

function handleTodoItemInputChange(name : string, value : string, target : any, copyOfActiveListEdit : ListType) : ListType {
    if(name.includes("todo_item_name_")) {
        var itemIndex = parseInt(name.replace("todo_item_name_", ""));
        copyOfActiveListEdit.list_items[itemIndex].item_name = value;
    }
    if(name.includes("todo_item_description_")) {
        var itemIndex = parseInt(name.replace("todo_item_description_", ""));
        copyOfActiveListEdit.list_items[itemIndex].item_description = value;
        // console.log()
    }
    if(name.includes("todo_item_checkbox_")) {
        var itemIndex = parseInt(name.replace("todo_item_checkbox_", ""));
        (copyOfActiveListEdit as TodoList).list_items[itemIndex].item_is_checked = target.checked;
    }
    return copyOfActiveListEdit;
}