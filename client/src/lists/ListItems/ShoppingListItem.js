/**
 * Shopping List Item
 */

import GenericListItem from "./GenericListItem";

export default class ShoppingListItem extends GenericListItem {

    constructor(name, description="", price=0.00, link="", isChecked=false) {
        super(name, description);
        this.price = price;
        this.link = link;
        this.isChecked = isChecked;
    }

    setPrice(newPrice) {
        this.price = newPrice;
    }

    setLink(newLink) {
        this.link = newLink;
    }

    setIsChecked(newIsChecked) {
        this.isChecked = newIsChecked;
    }

    getPrice() {
        return this.price;
    }

    getLink() {
        return this.link;
    }

    getIsChecked() {
        return this.isChecked;
    }
}