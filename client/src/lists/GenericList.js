/**
 * Generic list class that all others will inherit from
 */

export default class GenericList {

    constructor(id, name, description="", dateCreated, dateLastModified="") {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dateCreated = dateCreated;
        this.dateLastModified = dateLastModified;
    }

    setId(newId) {
        this.id = newId;
    }

    setName(newName) {
        this.name = newName;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    setDateCreated(newDateCreated) {
        this.dateCreated = newDateCreated;
    }

    setDateLastModified(newDateLastModified) {
        this.dateLastModified = newDateLastModified;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getDateCreated() {
        return this.dateCreated;
    }

    getDateLastModified() {
        return this.dateLastModified;
    }
}