import React, { Component } from "react";
import { withRouter } from "react-router";
import Select from 'react-select';
class ListsListDropdown extends Component {

  constructor(props) {
      super(props);
      this.state = {
        listNames: props.lists,
        selectOptions: this.getListOptions(props.lists)
      }
  }

  getListOptions(lists, update){
    var options = []
    for(var list in lists) {
      options.push({
        value: lists[list].listId,
        label: lists[list].listName
      });
    }

    if (update !== undefined && update) {
      this.setState({
        selectOptions: options
      });
      return;
    }

    return options;
  }

  handleChange = selectedOption => {
    this.setState({selectedOption});
    this.props.changeActiveList(selectedOption.value);
    console.log(selectedOption);
  }

  render() {
    return (
      <Select options={this.state.selectOptions} onChange={this.handleChange} />
    );
  }
}

export default withRouter(ListsListDropdown);