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
}

export interface ShoppingListItem extends GenericListItem {
    is_bought?: string;
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
    readonly id: string;
    name: string;
    description: string;
    date_created: number;
    date_last_modified: number;
}

export interface GiftList extends GenericList {
    type?: "gift";
    list_items: GiftListItem[];
}

export interface ShoppingList extends GenericList {
    type?: "shopping";
    list_items: ShoppingListItem[];
}

export interface TodoList extends GenericList {
    type?: "todo";
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
    return await fetch(flask_url + "/api/user/lists", requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return createListArray(data);
    })
    .catch(error => {
        //console.log(error);
    })
}

export function createListArray (listData : any[]) {
    var list_array : Array<any> = [];
    // console.log(listData);
    listData.forEach(list => {
        const list_type = list.list_type.toLowerCase();
        let list_details = {
            id: list._id.$oid,
            name: list.list_name,
            description: list.list_description,
            date_created: list.date_created.$date,
            date_last_modified: list.date_last_modified.$date,
            list_items: getListItemsArray(list.list_items, list_type)
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
        bought_by_id: item.item_bought_by_id.$oid
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
            name: list.name,
            id: list.id
        }
        minimal_list_array.push(newMinimalList);
    });
    return minimal_list_array;
}

export function getListById (list_array : any[], id : string) {
    console.log(list_array)
    if (!Array.isArray(list_array)) {
        return;
    }
    list_array.forEach(list => {
        if (list.id === id) {
            return list;
        }
    });
    return;
}