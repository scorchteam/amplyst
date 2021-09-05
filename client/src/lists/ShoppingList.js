/**
 * Shopping list
 */

import GenericList from "./GenericList";
import ShoppingListItem from "./ListItems/ShoppingListItem";

export default class ShoppingList extends GenericList {

    constructor(id, name, description="", dateCreated, dateLastModified="", listItems) {
        super(id, name, description, dateCreated, dateLastModified);
        this.type = "SHOPPING";
        this.listItems = listItems;
        this.listItemsArray = this.createListItemsArray(listItems);
    }

    setOriginalListItemsArray(newOriginalListItemsArray) {
        this.originalListItemsArray = newOriginalListItemsArray;
    }

    setListItemsArray(newListItems) {
        this.setOriginalListItemsArray(newListItems);
        this.listItemsArray = this.createListItemsArray(newListItems);
    }

    getType() {
        return this.type;
    }

    getOriginalListItemsArray() {
        return this.originalListItemsArray;
    }

    getListItemsArray() {
        return this.listItemsArray;
    }

    createListItemsArray(listItems) {
        var listItemArray = []
        for (var key in listItems) {
            const currentItem = listItems[key];
            listItemArray.push(new ShoppingListItem(currentItem.item_name, currentItem.item_description, currentItem.item_price, currentItem.item_link, currentItem.is_checked));
        }
        return listItemArray;
    }
}