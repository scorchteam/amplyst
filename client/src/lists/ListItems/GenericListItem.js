/**
 * Generic List Item
 */

export default class GenericListItem {

    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    setName(newName) {
        this.name = newName;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }
}