/**
 * Todo list
 */

import GenericList from "./GenericList";
import TodoListItem from "./ListItems/TodoListItem";

export default class TodoList extends GenericList {

    constructor(id, name, description="", dateCreated, dateLastModified="", listItems) {
        super(id, name, description, dateCreated, dateLastModified);
        this.type = "TODO";
        this.originalListItemsArray = listItems;
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
            listItemArray.push(new TodoListItem(currentItem.item_name, currentItem.item_description, currentItem.is_checked));
        }
        return listItemArray;
    }
}