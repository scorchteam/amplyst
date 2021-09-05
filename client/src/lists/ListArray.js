/**
 * Creates list array from array
 */

import TodoList from "./TodoList";
import ShoppingList from "./ShoppingList";
import GiftList from "./GiftList";

export default class ListArray {
    
    constructor(originalListArray) {
        this.validListTypes = ["todo", "shopping", "gift"];
        this.originalListArray = originalListArray;
        this.listArray = this.createNewListArray(originalListArray);
    }

    setOriginalListArray(newOriginalListArray) {
        this.originalListArray = newOriginalListArray;
    }

    setListArray(newOriginalListArray) {
        this.setOriginalListArray(newOriginalListArray);
        this.createNewListArray(newOriginalListArray);
    }

    getOriginalListArray() {
        return this.originalListArray;
    }

    getListArray() {
        return this.listArray;
    }

    createNewListArray(originalListArray) {
        var listArray = [];
        for (var key in originalListArray) {
            const currentList = originalListArray[key];
            //TODO Modified is not yet apart of the backend
            const currentListGenericData = {
                id: currentList._id.$oid,
                type: currentList.list_type,
                created: currentList.date_created.$date,
                name: currentList.list_name,
                description: currentList.list_description,
                modified: "",
                items: currentList.list_items
            }
            if (!this.validListTypes.includes(currentListGenericData.type)) {
                console.error("Returned list if not of valid type");
                continue;
            }
            switch(currentListGenericData.type) {
                case "todo":
                    listArray.push(this.createTodoList(currentListGenericData));
                    break;
                case "shopping":
                    listArray.push(this.createShoppingList(currentListGenericData));
                    break;
                case "gift":
                    listArray.push(this.createGiftList(currentListGenericData));
                    break;
                default:
                    break;
            }
        }
        return listArray;
    }

    createTodoList(currentListGenericData) {
        return new TodoList(currentListGenericData.id, currentListGenericData.name, currentListGenericData.description, currentListGenericData.created, currentListGenericData.modified, currentListGenericData.items);
    }

    createShoppingList(currentListGenericData) {
        return new ShoppingList(currentListGenericData.id, currentListGenericData.name, currentListGenericData.description, currentListGenericData.created, currentListGenericData.modified, currentListGenericData.items);
    }

    createGiftList(currentListGenericData) {
        return new GiftList(currentListGenericData.id, currentListGenericData.name, currentListGenericData.description, currentListGenericData.created, currentListGenericData.modified, currentListGenericData.items);
    }

    getListById(listId) {
        for (var list in this.listArray) {
            if(this.listArray[list].getId() === listId) {
                return this.listArray[list];
            } 
        }
    }

    getMinimalListData() {
        var listNameList = []
        for (var list in this.listArray) {
            listNameList.push({
                listName: this.listArray[list].getName(),
                listId: this.listArray[list].getId()
            });
        }
        return listNameList;
    }
}