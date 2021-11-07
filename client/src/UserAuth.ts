import { flask_url } from "./App";
import { createListArray } from "./lists/ListInterfaces";
import { createUserObject } from "./UserInterface";

export const fetchUserInfo = async (userAuthToken : any, updateUserInfo : any) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userAuthToken,
                'Origin': flask_url },
    };
    fetch(flask_url + "/api/user/retrieveUserInfo", requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateUserInfo(createUserObject(data));
        // updateUserInfo(data);
    })
    .catch(error => {
        console.log(error);
    })
}

export const fetchUserListData = async (userAuthToken : any, updateUserListData : any) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userAuthToken,
                'Origin': flask_url },
    };
    //fetch with GET request
    fetch(flask_url + "/api/user/lists", requestOptions)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        updateUserListData(createListArray(data));
    })
    .catch(error => {
        console.log(error)
    })
}