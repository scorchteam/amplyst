import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { ListsList, ListView, NewListModal } from "./components";
import queryString from 'query-string';
import { Link } from "react-router-dom";
import "./Lists.scss";
import ListsListDropdown from "./components/ListsList/ListsListDropdown";

// const ListsFunctional = (props) => {
//   const [userListData, updateUserListData] = useState(props.userListData);
//   const [listNameList, updateListNameList] = useState(this.getListOfLists(props.userListData));
//   const [urlVals, updateurlVals] = useState(this.urlVals);
//   const [renderListFromUrl, updaterenderListFromUrl] = useState(false);
//   const [show, updateshow] = useState(false);
//   const [activeList, updateactiveList] = useState(undefined);
//   const [width, setWidth] = useState(window.innerWidth);



//   if (this.urlVals && this.urlVals.list && this.urlVals.list !== "") {
//     updaterenderListFromUrl(true);
//     updateactiveList(this.urlVals.list);
//   }

//   const handleModalShow = (boolean) => updateshow(boolean);


//   useEffect(() => setWidth(window.innerWidth), [window.resize]);


//   return ...
// }

class Lists extends Component {

  constructor(props) {
      super(props);
      this.urlVals = queryString.parse(props.location.search)
      this.state = {
        userListData: props.userListData,
        listNameList: this.getListOfLists(props.userListData),
        urlVals: this.urlVals,
        renderListFromUrl: false,
        show: false
      }

      if (this.urlVals && this.urlVals.list && this.urlVals.list !== "") {
        this.state.renderListFromUrl = true
        this.state.activeList = this.urlVals.list
      }

      this.changeActiveList = this.changeActiveList.bind(this);
      this.handleModalShow = this.handleModalShow.bind(this);
      this.updateListData = this.updateListData.bind(this);
  }

  handleModalShow(boolean) {
    this.setState({
      show: boolean
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth
    });
  }

  changeActiveList(listId) {
    console.log("Changing list")
    this.setState({
      activeList: listId
    });
  }

  getListOfLists(listsObj) {
    var nameList = []
    for (var key in listsObj) {
      if (listsObj[key] !== undefined && listsObj[key]["_id"] !== undefined) {
        const listId = listsObj[key]["_id"]["$oid"]
        const listName = listsObj[key]["list_name"]
        const listObj = {
          listName: listName,
          listId: listId
        }
        nameList.push(listObj)
      }
    }
    return nameList
  }

  getListById(listId) {
    var retList = undefined;
    for (var list in this.state.userListData) {
      if(this.state.userListData[list]["_id"] !== undefined){
        if (this.state.userListData[list]["_id"]["$oid"] === listId) {
          retList = this.state.userListData[list]
        }
      }
    }
    return retList;
  }

  updateListData(listData) {
    console.log(listData);
    this.setState({
      userListData: [...listData],
      listNameList: [...this.getListOfLists(listData)]
    });
  }

  render() {
    return (
      <Container fluid="md">
        <NewListModal handleModalShow={this.handleModalShow} show={this.state.show} updateListData={this.updateListData}/>
        <div className="lists-container">
          {
            this.state.width >= 992 &&
            <>
              <div className="lists-container-col-1">
                <ListsList lists={this.state.listNameList} changeActiveList={this.changeActiveList} handleModalShow={this.handleModalShow}/>
              </div>
              <div className="lists-container-col-2">
                <ListView listData={this.getListById(this.state.activeList)}/>
              </div>
            </>
          }

          {
            this.state.width < 992 &&
            <>
              {
                this.state.renderListFromUrl &&
                <>
                  <Link to={"/lists"}>Go Back</Link>
                  <div className="lists-container-col-2">
                    <ListView listData={this.getListById(this.state.urlVals)}/>
                  </div>
                </>
              }
              {
                !this.state.renderListFromUrl &&
                <>
                  <Button variant="primary" onClick={() => this.handleModalShow(true)}>
                      Add a new list
                  </Button>
                  <ListsListDropdown lists={this.state.listNameList} changeActiveList={this.changeActiveList} />
                  <ListView listData={this.getListById(this.state.activeList)}/>
                </>
              }
            </>
          }
          
        </div>
      </Container>
    );
  }
}

export default withRouter(Lists);