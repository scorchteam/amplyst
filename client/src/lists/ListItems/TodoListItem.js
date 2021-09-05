/**
 * Todo List Item
 */

import GenericListItem from "./GenericListItem";

export default class TodoListItem extends GenericListItem {

    constructor(name, description="", isChecked=false) {
        super(name, description);
        this.isChecked = isChecked;
    }

    setIsChecked(newIsChecked) {
        this.isChecked = newIsChecked;
    }
    
    getIsChecked() {
        return this.isChecked;
    }
}