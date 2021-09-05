/**
 * Class for giftlists
 */

import GenericList from "./GenericList";
import GiftListItem from "./ListItems/GiftListItem";

export default class GiftList extends GenericList {

    constructor(id, name, description="", dateCreated, dateLastModified="", listItems) {
        super(id, name, description, dateCreated, dateLastModified);
        this.type = "GIFT";
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
            listItemArray.push(new GiftListItem(currentItem.item_name, currentItem.item_description, currentItem.item_price, currentItem.item_link, currentItem.item_is_bought, currentItem.item_bought_by));
        }
        return listItemArray;
    }
}