// @ts-ignore
import validator from "validator";

/** Validate emails */
export const validateEmail = (email: string) => {

    if (email === "") {
        return "Email must not be blank";
    }

    if (!validator.isEmail(email)) {
        return "Not a valid email";
    }

    return undefined;
}


/* Validates password field */
export const validatePassword = (password: string) => {

    //empty input box
    if (password === "") {
        return "Password must not be blank";
    }

    if (password !== undefined && password.length < 8) {
        return "Password must be 8 characters or longer";
    }

    return undefined;
}

//Validate name field
export const validateName = (name: string) => {

    //empty input box
    if (name === "") {
        return "name must not be blank";
    }

    //check for alphanumerics
    if (!validateAlphanumericName(name)) {
        return "name must contain only alphanumeric characters and hyphens";
    }

    //Check if name is longer than 256 chars
    if (name.length > 256) {
        return "name has a limit of 256 characters";
    }

    return undefined;
}

/**
 * Validate name fields with alphanumeric regexp
 * Returns true if name matches
 */
function validateAlphanumericName(name : string) {
    //alphanumeric regexp
    var nameRegExp = new RegExp("^[a-zA-Z-]*$");
    return name.match(nameRegExp);
}

//Validate subject field
export const validateSubject = (subject: string) => {

    //empty input box
    if (subject === "") {
        return "subject must not be blank";
    }

    //check for alphanumerics
    // if (!validateAlphanumericName(subject)) {
    //     return "subject must contain only alphanumeric characters and hyphens";
    // }

    //Check if name is longer than 256 chars
    if (subject.length > 256) {
        return "name has a limit of 256 characters";
    }

    return undefined;
}

//Validate more information field
export const validateMoreInformation = (moreInformation: string) => {

    //empty input box
    if (moreInformation === "") {
        return "more information must not be blank";
    }

    //check for alphanumerics
    // if (!validateAlphanumericName(subject)) {
    //     return "subject must contain only alphanumeric characters and hyphens";
    // }

    //Check if name is longer than 256 chars
    if (moreInformation.length > 500) {
        return "name has a limit of 500 characters";
    }

    return undefined;
}