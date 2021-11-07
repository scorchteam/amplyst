import { flask_url } from "../App"
import { GiftList, ListType, ShoppingList, TodoList } from "./ListInterfaces"

export const createEmptyTodoList = () => {
    let newEmptyTodoList : TodoList = {
        list_name: "New Todo List",
        list_type: "todo",
        list_description: "",
        list_items: []
    }
    return newEmptyTodoList;
}

export const createEmptyGiftList = () => {
    let newEmptyGiftList : GiftList = {
        list_name: "New Gift List",
        list_type: "gift",
        list_description: "",
        list_items: []
    }
    return newEmptyGiftList;
}

export const createEmptyShoppingList = () => {
    let newEmptyShoppingList : ShoppingList = {
        list_name: "New Shopping List",
        list_type: "shopping",
        list_description: "",
        list_items: []
    }
    return newEmptyShoppingList;
}

export const submitNewEmptyList = async ( newEmptyList : ListType, authToken : string ) => {
    /** Create POST request options */
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'crossorigin': 'true',
            'Authorization': 'Bearer ' + authToken,
            'Origin': flask_url
        },
        body: JSON.stringify(newEmptyList)
    };
    console.log(requestOptions.body);
    /** Execute POST request */
    return await fetch(flask_url + "/api/user/lists", requestOptions)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        })
}