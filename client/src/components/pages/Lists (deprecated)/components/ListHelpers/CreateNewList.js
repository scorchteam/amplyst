/**
 * Helper functions for creating new lists
 */


/** Defined valid list types */
const validListTypes = [
    "gift",
    "todo",
    "shopping"
]

/**
 * Returns a string defining any errors with the listType
 * provided
 * @param {string} listType 
 * @returns string of error if one exists 
 */
export function validateListType(listType) {
    var error = "";
    var isValidType = false;
    //Loop through listTypes and check for valid def
    for(var type in validListTypes) {
        if(listType === validListTypes[type]){
            isValidType = true;
        }
    }
    //Define error if invalid
    if(!isValidType){
        error = "Invalid list type";
    }
    return error;
}

/**
 * Returns error if something is wrong
 * with the defined listName
 * @param {string} listName 
 * @returns string of error if one exists
 */
export function validateListName(listName) {
    var error = "";
    if(listName === "") {
        error = "List Name cannot be empty";
    }
    return error;
}

/**
 * Returns an object of defined errors
 * if listFormData does not follow valid form data
 * 
 * listFormData Valid Format:
 * 
 * Keys:                        Values:
 * - listName (required)        - String of list name
 * - listType (required)        - String of list type
 * - listDescription (optional) - String of the list description
 * 
 * @param {object} ListFormData 
 * @returns object of error found
 */
export function validateListFormData(ListFormData) {
    var errors = {};
    var objKeys = Object.keys(ListFormData);

    /** Check to make sure listType exists */
    if(objKeys.length === 0) {
        errors["listType"] = "You must select a list type";
    }

    /** Check that list has name */
    if(objKeys.length > 0 && !("listName" in ListFormData)) {
        errors["listName"] = "List name must not be empty";
    }

    /** Loop through formData and validate listType and listName */
    for(var key in ListFormData) {
        //Check listType
        if(key === "listType") {
            const error = validateListType(ListFormData[key]);
            if (error !== "") {
                errors["listType"] = error;
            }
        }
        //Check listName
        if(key === "listName") {
            const error = validateListName(ListFormData[key]);
            if (error !== "") {
                errors["listName"] = error;
            }
        }
    }
    return errors;
}

/**
 * Returns await of POST request for a user creating a new list
 * @param {object} formData list form data
 * @param {string} token user auth token
 * @param {string} flask_url flask api url
 * @returns await of POST request
 */
export const createNewList = async (formData, token, flask_url) => {
    const listName = formData.listName;
    const listType = formData.listType;
    var listDescription = formData.listDescription;
    /**
     * Check for undefined listDescription and make empty
     * string to avoid error in request
     */
    if(listDescription === undefined) {
        listDescription = "";
    }
    /** Create request body based on formData */
    const requestBody = {
        "list_name": listName,
        "list_type": listType,
        "list_description": listDescription,
        "list_elements": [],
        "date_created": "6/11/2021"
    };
    /** Create POST request options */
    const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'crossorigin': 'true',
        'Authorization': 'Bearer ' + token,
        'Origin': flask_url
    },
    body: JSON.stringify(requestBody)
    };
    /** Execute POST request */
    return await fetch(flask_url + "/api/user/lists", requestOptions).then(res => res.json());
}

/**
 * Returns await of GET request to grab updated user data from API
 * @param {string} flask_url
 * @returns await of GET request to grab list data
 */
export const grabListData = async (flask_url) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  'Origin': flask_url },
      };
  
      return await fetch(flask_url + "/api/user/lists", requestOptions)
      .then(response => response.json())
      .catch(error => {
        console.log(error)
      })
}