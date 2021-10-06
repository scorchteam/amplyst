import React from "react";
import { withRouter } from "react-router";

const ShoppingListView = (props) => {
    const iterateShoppingListItems = (listItems) => {
        if (listItems === undefined || listItems.length === 0) {
            return (
                <li id="list-view-first-element" onClick={() => props.handleModalShow(true)}>
                    <i className="fas fa-plus"></i>
                    <p>Add New Item</p>
                </li>
            );
        }
        return listItems.map((item, index) => (
            <li key={index}>
                <div className="list-item-header">
                    <p className="list-item-title">{item.getName()}</p>
                    <p className="list-item-price">{convertNumberToPrice(item.getPrice())}</p>
                    <input type="checkbox"></input>
                </div>
                <i><p>{item.getDescription()}</p></i>
                <a href={item.getLink()}>{item.getLink()}</a>
            </li>
        )) 
    }

    const convertNumberToPrice = (price) => {
        if (price !== undefined && price !== 0) {
          return ("$" + price); 
        }
    }

    return (
        <ul>
            {iterateShoppingListItems(props.listItems.getListItemsArray())}
        </ul>
    );
}

export default withRouter(ShoppingListView);