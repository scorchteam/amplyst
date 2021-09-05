import { flask_url } from "../../../../../App";
import ListArray from "../../../../../lists/ListArray";
import { grabListData } from "./CreateNewList";

export const deleteList = async (listId) => {
    const userToken = localStorage.getItem('token');
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + userToken,
                  'Origin': flask_url },
      };
    
      return await fetch(flask_url + "/api/user/list/" + listId, requestOptions)
      .catch(error => {
          console.log(error);
      })
}

export const updateLists = (updateListData) => {
    grabListData(flask_url).then((listData) => {
        updateListData(new ListArray(listData));
    })
}