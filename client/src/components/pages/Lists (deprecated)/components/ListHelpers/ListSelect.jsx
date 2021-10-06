import React, { useState } from "react";
import { withRouter } from "react-router";
import Select from 'react-select';

/**
 * Renders the listSelect element on mobile views
 * @param {object} props 
 * @returns render of listSelect element
 */
const ListSelect = (props) => {
  /**
   * Returns parsed lists and grabs list id's and list names
   * @param {array} lists 
   * @param {boolean} update 
   * @returns object of what select options should update to
   */
   const getListOptions = (lists, update) => {
    var options = [];
    /** Loop through lists and grab listId and listName */
    for (var list in lists) {
      options.push({
        value: lists[list].listId,
        label: lists[list].listName
      });
    }
    //Check if update is true and update select options
    if (update !== undefined && update) {
      updateSelectOptions(options);
      return;
    }
    return options
  }
  
  const [selectOptions, updateSelectOptions] = useState(getListOptions(props.lists));
  const [selectedOption, updateSelectedOption] = useState();

  /**
   * Updates state with newly selected list
   * from react-select element
   * @param {HTML} selectedOption 
   */
  const handleChange = selectedOption => {
    updateSelectedOption(selectedOption);
    props.changeActiveList(selectedOption.value);
  }
  return (
    <Select options={selectOptions} onChange={handleChange} value={selectedOption} />
  );
}

export default withRouter(ListSelect);