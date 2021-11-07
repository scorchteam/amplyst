/**
 * List interfaces and contracts for interfacing with DB
 */


//List items interfaces
export interface GenericListItem {
    readonly id: string;
    name: string;
    description?: string;
}

export interface GiftListItem extends GenericListItem {
    price?: number | 0.00;
    intended_for_name?: string;
    intended_for_id?: string;
    is_bought?: boolean;
    bought_by_name?: string;
    bought_by_id?: string;
    link?: string;
}

export interface ShoppingListItem extends GenericListItem {
    is_bought?: boolean;
    price?: number;
    location?: string;
    link?: string;
}

export interface TodoListItem extends GenericListItem {
    is_checked?: boolean;
    due_date?: number;
}

export type ListItemsType = GiftListItem | TodoListItem | ShoppingListItem;

//List interfaces
export interface GenericList {
    readonly id?: string;
    list_name: string;
    list_description?: string;
    date_created?: number;
    date_last_modified?: number;
}

export interface GiftList extends GenericList {
    list_type?: "gift";
    list_items: GiftListItem[];
}

export interface ShoppingList extends GenericList {
    list_type?: "shopping";
    list_items: ShoppingListItem[];
}

export interface TodoList extends GenericList {
    list_type?: "todo";
    list_items: TodoListItem[];
}

export type ListType = GiftList | ShoppingList | TodoList;

//List Array Interface
export interface ListArray {
    lists: ListType[];
}

//Minimal list interfaces
export interface MinimalList {
    name: string,
    id: string
}

export const grabUserListData = async (flask_url: string, token: string) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                  'Origin': flask_url }
    };
    const requestData = await fetch(flask_url + "/api/user/lists", requestOptions);
    const listArray = createListArray(await requestData.json());
    return listArray;
}

export function createListArray (listData : any[]) {
    var list_array : Array<any> = [];
    // console.log(listData);
    listData.forEach(list => {
        const list_type = list.list_type.toLowerCase();
        let list_details = {
            id: list._id.$oid,
            list_name: list.list_name,
            list_description: list.list_description,
            date_created: list.date_created.$date,
            date_last_modified: list.date_last_modified.$date,
            list_items: getListItemsArray(list.list_items, list_type),
            list_type: list.list_type,
        };
        if (list_type === "todo") {
            let newTodoList : TodoList = list_details;
            list_array.push(newTodoList);
        }
        if (list_type === "gift") {
            let newTodoList : GiftList = list_details;
            list_array.push(newTodoList);
        }
        if (list_type === "shopping") {
            let newTodoList : ShoppingList = list_details;
            list_array.push(newTodoList);
        }
    });
    //sort list by date created
    list_array.sort(function (a, b) : any {
        var c : any = new Date(a.date_created);
        var d : any = new Date(b.date_created);
        return c-d;
    })
    return list_array;
}

export function getListItemsArray (list_items: any[], list_type: string) {
    var list_items_array : Array<any> = [];
    if (list_type === "todo") {
        list_items.forEach(item => {list_items_array.push(createTodoListItem(item))})
    }
    if (list_type === "gift") {
        list_items.forEach(item => {list_items_array.push(createGiftListItem(item))})
    }
    if (list_type === "shopping") {
        list_items.forEach(item => {list_items_array.push(createShoppingListItem(item))})
    }
    return list_items_array
}

export function createTodoListItem (item: any) {
    let newTodoListItem : TodoListItem = {
        id: item.item_id.$oid,
        name: item.item_name,
        description: item.item_description,
        is_checked: item.item_is_checked,
        due_date: item.item_due_date.$date
    }
    return newTodoListItem
}

export function createGiftListItem (item: any) {
    let newGiftListItem : GiftListItem = {
        id: item.item_id.$oid,
        name: item.item_name,
        description: item.item_description,
        price: item.item_price,
        intended_for_name: item.item_intended_for_name,
        intended_for_id: item.item_intended_for_id.$oid,
        is_bought: item.item_is_bought,
        bought_by_name: item.item_bought_by_name,
        bought_by_id: item.item_bought_by_id.$oid,
        link: item.item_link
    }
    return newGiftListItem
}

export function createShoppingListItem (item: any) {
    let newShoppingListItem : ShoppingListItem = {
        id: item.item_id.$oid,
        name: item.item_name,
        description: item.item_description,
        is_bought: item.item_is_bought,
        price: item.item_price,
        location: item.item_location,
        link: item.item_link
    }
    return newShoppingListItem
}

export function getMinimalListData (list_array : ListArray) {
    if (!Array.isArray(list_array)) {
        return;
    }
    var minimal_list_array : any = [];
    list_array.forEach(list => {
        // console.log(list)
        let newMinimalList : MinimalList = {
            name: list.list_name,
            id: list.id
        }
        minimal_list_array.push(newMinimalList);
    });
    return minimal_list_array;
}

export function getListById (list_array : ListArray, id : string) : ListType | undefined {
    if (!Array.isArray(list_array)) {
        return;
    }
    var retList : ListType | undefined;
    list_array.every(function (list, index) {
        var currentId = list.id;
        if (currentId === id) {
            retList = list;
            return false;
        }
        return true;
    })
    return retList;
}

export const deleteList = async (flask_url : string, token : string, listId : string) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                  'Origin': flask_url },
    };

    return await fetch(flask_url + "/api/user/list/" + listId, requestOptions)
    .then(response => response.json())
    .catch(error => {
        console.log(error);
    });
}

export function getListType (list : ListType) : string {
    if (!list) {
        return "";
    }
    if (list.list_type) {
        return list.list_type.toUpperCase();
    }
    return "";
}

export function convertTimeString(date : number) : string {
    if (!date) {
        const newDate = new Date(1);
        return newDate.toLocaleDateString();
    }
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
}

export function getListName(list : ListType) : string {
    if (!list) {
        return "";
    }
    if (list.list_name) {
        return list.list_name;
    }
    return "";
}

export function getListDescription(list : ListType) : string {
    if (!list) {
        return "";
    }
    if (list.list_description) {
        return list.list_description;
    }
    return "";
}

export function isEmpty(list : ListType) : boolean {
    if (!list) {
        return false;
    }
    if (list.list_items) {
        return list.list_items.length === 0;
    }
    return false;
}

export const addExampleList = async (flask_url : string, token : string, updateUserListData : any) => {
    const requestBody = getRequestBody();
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
    await fetch(flask_url + "/api/user/lists", requestOptions)
    .then(res => res.json())
    .then(data => grabUserListData(flask_url, token))
    .then(userListData => updateUserListData(userListData));
}

const getRequestBody = () => {
    const rndInt = Math.floor(Math.random() * 3) + 1;
    if (rndInt === 1) {
        return {
            "list_name": "This is a TodoList",
            "list_type": "todo",
            "list_description": "This is the description of my Todo list",
            "list_elements": [
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_is_checked": "true",
                    "item_due_date": "2021-09-20 06:35:28.246189"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_is_checked": "false",
                    "item_due_date": "2021-09-20 06:35:28.246189"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_is_checked": "true",
                    "item_due_date": "2021-09-20 06:35:28.246189"
                }
            ]
        }
    }
    if (rndInt === 2) {
        return {
            "list_name": "This is a GiftList",
            "list_type": "gift",
            "list_description": "This is the description of my Gift list",
            "list_elements": [
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                },
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_intended_for_name": "John Smith",
                    "item_intended_for_id": "",
                    "item_is_bought": "true",
                    "item_bought_by_name": "John Smith",
                    "item_bought_by_id": "",
                    "item_link": "https://www.google.com"
                }
            ]
        }
    }
    if (rndInt === 3) {
        return {
            "list_name": "This is a ShoppingList",
            "list_type": "shopping",
            "list_description": "This is the description of my Shopping list",
            "list_elements": [
                {
                    "item_name": "Gum",
                    "item_description": "This is Gum",
                    "item_price": "129.00",
                    "item_is_bought": "true",
                    "item_location": "Walmart",
                    "item_link": "https://www.walmart.com"
                }
            ]
        }
    }
    return {}
}