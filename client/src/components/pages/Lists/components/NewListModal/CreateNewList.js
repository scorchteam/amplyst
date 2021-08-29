const validListTypes = [
    "gift",
    "todo",
    "shopping"
]

export function validateListType(listType) {
    var error = "";
    var isValidType = false;
    for(var type in validListTypes) {
        if(listType === validListTypes[type]){
            isValidType = true;
        }
    }

    if(!isValidType){
        error = "Invalid list type";
    }
    return error;
}

export function validateListName(listName) {
    var error = "";
    if(listName === "") {
        error = "List Name cannot be empty";
    }
    return error;
}

export function validateListFormData(ListFormData) {
    var errors = {};

    var objKeys = Object.keys(ListFormData);

    if(objKeys.length === 0) {
        errors["listType"] = "You must select a list type";
    }

    if(objKeys.length > 0 && !("listName" in ListFormData)) {
        errors["listName"] = "List name must not be empty";
    }

    for(var key in ListFormData) {
        if(key === "listType") {
            const error = validateListType(ListFormData[key]);
            if (error !== "") {
                errors["listType"] = error;
            }
        }

        if(key === "listName") {
            const error = validateListName(ListFormData[key]);
            if (error !== "") {
                errors["listName"] = error;
            }
        }
    }

    return errors;
}

export const createNewList = async (formData, token, flask_url) => {
    const listName = formData.listName;
    const listType = formData.listType;
    var listDescription = formData.listDescription;
    if(listDescription === undefined) {
        listDescription = "";
    }
    const requestBody = {
        "list_name": listName,
        "list_type": listType,
        "list_description": listDescription,
        "list_elements": [],
        "date_created": "6/11/2021"
    };

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

    return await fetch(flask_url + "/api/user/lists", requestOptions).then(res => res.json());
}

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