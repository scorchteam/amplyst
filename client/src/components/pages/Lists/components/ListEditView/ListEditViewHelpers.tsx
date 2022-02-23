import { Form, InputGroup } from "react-bootstrap";
import { getListType, GiftList, GiftListItem, isEmpty, ListItemsType, ListType, ShoppingList, ShoppingListItem, TodoList, TodoListItem } from "../../../../../lists/ListInterfaces";

export const iterateTodoListItems = (listItems: ListItemsType[], activeListEdit: ListType, updateActiveListEdit: any) => {
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
                            <i className="fas fa-trash delete-icon"></i>
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

export const iterateGiftListItems = (listItems: ListItemsType[], activeListEdit: ListType, updateActiveListEdit: any) => {
    if (listItems) {
        return listItems.map((item, index) => (
            <li key={index} id="edit-list-item">
                <div className="list-item-data-container">
                    <div className="edit-list-item-header">
                        <div className="edit-list-item-title">
                            <Form.Label htmlFor={"gift_item_name_" + index}>Item Name</Form.Label>
                            <Form.Control id={"gift_item_name_" + index} name={"gift_item_name_" + index} onChange={(event) => {
                                activeListEdit &&
                                    handleInputChange(event, activeListEdit, updateActiveListEdit);
                            }} type="text" placeholder={item.item_name && item.item_name} />
                        </div>
                        <div className="edit-list-delete-item hover-pointer">
                            <i className="fas fa-trash"></i>Delete Item
                        </div>
                    </div>


                    <b><Form.Label htmlFor={"gift_item_description_" + index}>Item Description</Form.Label></b>
                    <Form.Control id={"gift_item_description_" + index} name={"gift_item_description_" + index} as="textarea" onChange={(event) => {
                        activeListEdit &&
                            handleInputChange(event, activeListEdit, updateActiveListEdit);
                    }} placeholder={item.item_description && item.item_description} />


                    <b><Form.Label htmlFor={"gift_item_link_" + index}>Item Link</Form.Label></b>
                    <Form.Control id={"gift_item_link_" + index} name={"gift_item_link_" + index} type="text" onChange={(event) => {
                        activeListEdit &&
                            handleInputChange(event, activeListEdit, updateActiveListEdit);
                    }} placeholder={(item as GiftListItem).item_link && (item as GiftListItem).item_link} />


                    <b><Form.Label htmlFor={"gift_item_price_" + index}>Item Price</Form.Label></b>
                    <InputGroup className="mb-3 price-input-group">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control id={"gift_item_price_" + index} name={"gift_item_price_" + index} aria-label="Amount (to the nearest dollar)" onChange={(event) => {
                            activeListEdit &&
                            handleInputChange(event, activeListEdit, updateActiveListEdit);
                        }} placeholder={(item as GiftListItem).item_price?.toString() && (item as GiftListItem).item_price?.toString()} />
                    </InputGroup>

                    <div className="edit-list-gift-checkbox">
                        <b><Form.Check id={"gift_item_checkbox_" + index} name={"gift_item_checkbox_" + index} type="checkbox" onChange={(event) => {
                            activeListEdit &&
                                handleInputChange(event, activeListEdit, updateActiveListEdit);
                        }} label="Finished" defaultChecked={(item as GiftListItem).item_is_bought} /></b>
                    </div>
                </div>
            </li>
        ))
    }
    return <></>;
}

export const iterateShoppingListItems = (listItems: ListItemsType[], activeListEdit: ListType, updateActiveListEdit: any) => {
    if (listItems) {
        return listItems.map((item, index) => (
            <li key={index} id="edit-list-item">
                <div className="list-item-data-container">
                    <div className="edit-list-item-header">
                        <div className="edit-list-item-title">
                            <Form.Label htmlFor={"shopping_item_name_" + index}>Item Name</Form.Label>
                            <Form.Control id={"shopping_item_name_" + index} name={"shopping_item_name_" + index} onChange={(event) => {
                                activeListEdit &&
                                    handleInputChange(event, activeListEdit, updateActiveListEdit);
                            }} type="text" placeholder={item.item_name && item.item_name} />
                        </div>
                        <div className="edit-list-delete-item hover-pointer">
                            <i className="fas fa-trash"></i>Delete Item
                        </div>
                    </div>


                    <b><Form.Label htmlFor={"shopping_item_description_" + index}>Item Description</Form.Label></b>
                    <Form.Control id={"shopping_item_description_" + index} name={"shopping_item_description_" + index} as="textarea" onChange={(event) => {
                        activeListEdit &&
                            handleInputChange(event, activeListEdit, updateActiveListEdit);
                    }} placeholder={item.item_description && item.item_description} />

                    <b><Form.Label htmlFor={"shopping_item_location_" + index}>Item Location</Form.Label></b>
                    <Form.Control id={"shopping_item_location_" + index} name={"shopping_item_location_" + index} type="text" onChange={(event) => {
                        activeListEdit &&
                            handleInputChange(event, activeListEdit, updateActiveListEdit);
                    }} placeholder={(item as ShoppingListItem).item_location && (item as ShoppingListItem).item_location} />


                    <b><Form.Label htmlFor={"shopping_item_link_" + index}>Item Link</Form.Label></b>
                    <Form.Control id={"shopping_item_link_" + index} name={"shopping_item_link_" + index} type="text" onChange={(event) => {
                        activeListEdit &&
                            handleInputChange(event, activeListEdit, updateActiveListEdit);
                    }} placeholder={(item as ShoppingListItem).item_link && (item as ShoppingListItem).item_link} />


                    <b><Form.Label htmlFor={"shopping_item_price_" + index}>Item Price</Form.Label></b>
                    <InputGroup className="mb-3 price-input-group">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control id={"shopping_item_price_" + index} name={"shopping_item_price_" + index} aria-label="Amount (to the nearest dollar)" onChange={(event) => {
                            activeListEdit &&
                            handleInputChange(event, activeListEdit, updateActiveListEdit);
                        }} placeholder={(item as ShoppingListItem).item_price?.toString() && (item as ShoppingListItem).item_price?.toString()} />
                    </InputGroup>

                    <div className="edit-list-gift-checkbox">
                        <b><Form.Check id={"shopping_item_checkbox_" + index} name={"shopping_item_checkbox_" + index} type="checkbox" onChange={(event) => {
                            activeListEdit &&
                                handleInputChange(event, activeListEdit, updateActiveListEdit);
                        }} label="Bought" defaultChecked={(item as ShoppingListItem).item_is_bought} /></b>
                    </div>
                </div>
            </li>
        ))
    }
    return <></>;
}

export const iterateListItems = (listData: ListType, activeListEdit: ListType, updateActiveListEdit: any) => {
    if (activeListEdit && isEmpty(activeListEdit)) {
        return (
            <></>
        );
    }
    var listType: string | undefined = undefined;
    if (activeListEdit) {
        listType = getListType(activeListEdit);
    }
    if (listType) {
        switch (listType) {
            case "GIFT":
                return iterateGiftListItems(activeListEdit.list_items, activeListEdit, updateActiveListEdit);
            case "SHOPPING":
                return iterateShoppingListItems(activeListEdit.list_items, activeListEdit, updateActiveListEdit);
            case "TODO":
                return iterateTodoListItems(activeListEdit.list_items, activeListEdit, updateActiveListEdit);
            default:
                return <></>;
        }
    }
    return <></>;
}

export const handleInputChange = (event: any, activeListEdit: ListType, updateActiveListEdit: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let copyOfActiveListEdit = { ...activeListEdit };

    if (name === "list_name") {
        copyOfActiveListEdit.list_name = value;
    }
    else if (name === "list_description") {
        copyOfActiveListEdit.list_description = value;
    }
    else if (name.includes("todo")) {
        copyOfActiveListEdit = handleTodoItemInputChange(name, value, target, copyOfActiveListEdit);
    }
    else if (name.includes("gift")) {
        copyOfActiveListEdit = handleGiftItemInputChange(name, value, target, copyOfActiveListEdit);
    }
    else if (name.includes("shopping")) {
        copyOfActiveListEdit = handleShoppingItemInputChange(name, value, target, copyOfActiveListEdit);
    }

    updateActiveListEdit(copyOfActiveListEdit);

    // console.log(event, activeListEdit);
}

function handleTodoItemInputChange(name: string, value: string, target: any, copyOfActiveListEdit: ListType): ListType {
    var itemIndex = undefined;
    if (name.includes("todo_item_name_")) {
        itemIndex = parseInt(name.replace("todo_item_name_", ""));
        copyOfActiveListEdit.list_items[itemIndex].item_name = value;
    }
    else if (name.includes("todo_item_description_")) {
        itemIndex = parseInt(name.replace("todo_item_description_", ""));
        copyOfActiveListEdit.list_items[itemIndex].item_description = value;
        // console.log()
    }
    else if (name.includes("todo_item_checkbox_")) {
        itemIndex = parseInt(name.replace("todo_item_checkbox_", ""));
        (copyOfActiveListEdit as TodoList).list_items[itemIndex].item_is_checked = target.checked;
    }
    return copyOfActiveListEdit;
}

function handleGiftItemInputChange(name: string, value: string, target: any, copyOfActiveListEdit: ListType): ListType {
    var itemIndex = undefined;
    if (name.includes("gift_item_name_")) {
        itemIndex = parseInt(name.replace("gift_item_name_", ""));
        copyOfActiveListEdit.list_items[itemIndex].item_name = value;
    }
    else if (name.includes("gift_item_description_")) {
        itemIndex = parseInt(name.replace("gift_item_description_", ""));
        copyOfActiveListEdit.list_items[itemIndex].item_description = value;
        // console.log()
    }
    else if (name.includes("gift_item_checkbox_")) {
        itemIndex = parseInt(name.replace("gift_item_checkbox_", ""));
        (copyOfActiveListEdit as GiftList).list_items[itemIndex].item_is_bought = target.checked;
    }
    else if (name.includes("gift_item_link_")) {
        itemIndex = parseInt(name.replace("gift_item_link_", ""));
        (copyOfActiveListEdit as GiftList).list_items[itemIndex].item_link = value;
    }
    else if (name.includes("gift_item_price_")) {
        itemIndex = parseInt(name.replace("gift_item_price_", ""));
        (copyOfActiveListEdit as GiftList).list_items[itemIndex].item_price = parseFloat(value);
    }
    return copyOfActiveListEdit;
}

function handleShoppingItemInputChange(name: string, value: string, target: any, copyOfActiveListEdit: ListType): ListType {
    var itemIndex = undefined;
    if (name.includes("shopping_item_name_")) {
        itemIndex = parseInt(name.replace("shopping_item_name_", ""));
        copyOfActiveListEdit.list_items[itemIndex].item_name = value;
    }
    else if (name.includes("shopping_item_description_")) {
        itemIndex = parseInt(name.replace("shopping_item_description_", ""));
        copyOfActiveListEdit.list_items[itemIndex].item_description = value;
        // console.log()
    }
    else if (name.includes("shopping_item_checkbox_")) {
        itemIndex = parseInt(name.replace("shopping_item_checkbox_", ""));
        (copyOfActiveListEdit as ShoppingList).list_items[itemIndex].item_is_bought = target.checked;
    }
    else if (name.includes("shopping_item_link_")) {
        itemIndex = parseInt(name.replace("shopping_item_link_", ""));
        (copyOfActiveListEdit as ShoppingList).list_items[itemIndex].item_link = value;
    }
    else if (name.includes("shopping_item_price_")) {
        itemIndex = parseInt(name.replace("shopping_item_price_", ""));
        (copyOfActiveListEdit as ShoppingList).list_items[itemIndex].item_price = parseFloat(value);
    }
    else if (name.includes("shopping_item_location_")) {
        itemIndex = parseInt(name.replace("shopping_item_location_", ""));
        (copyOfActiveListEdit as ShoppingList).list_items[itemIndex].item_location = value;
    }
    return copyOfActiveListEdit;
}