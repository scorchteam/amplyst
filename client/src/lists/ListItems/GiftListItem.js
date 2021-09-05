/**
 * Gift List Item
 */

import GenericListItem from "./GenericListItem";

export default class GiftListItem extends GenericListItem {

    constructor(name, description="", price=0.00, link="", isBought=false, boughtBy="") {
        super(name, description);
        this.price = price;
        this.link = link;
        this.isBought = isBought;
        this.boughtBy = boughtBy;
    }

    setPrice(newPrice) {
        this.price = newPrice;
    }

    setLink(newLink) {
        this.link = newLink;
    }

    setIsBought(newIsBought) {
        this.isBought = newIsBought;
    }

    setBoughtBy(newBoughtBy) {
        this.boughtBy = newBoughtBy;
    }

    getPrice() {
        return this.price;
    }

    getLink() {
        return this.link;
    }

    getIsBought() {
        return this.isBought;
    }

    getBoughtBy() {
        return this.boughtBy;
    }
}