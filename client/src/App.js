import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer, ProtectedRoute, UnProtectedRoute } from "./components/general";
import {
  Home, About, Contact, Examples, Login, Logout, Register,
  PrivacyPolicy, TermsAndConditions, FourZeroFour, Welcome, Lists,
  Profile, Friends, Calendar, Settings/*, Life*/
} from "./components/pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// export const flask_url = "https://giftlists-api.herokuapp.com";
// export const flask_url = "http://172.26.99.3:5000";
export const flask_url = "http://localhost:5000";

class App extends Component {

  constructor(props){
    super(props);

    const token = localStorage.getItem('token');

    this.state = {
      loggedIn: (token !== null),
      token: token,
    }

    if (token !== null) {
      this.validateUserToken(token);
      this.grabUserListData(token);
    }

    this.logout = this.logout.bind(this);
    this.grabUserListData = this.grabUserListData.bind(this);
  }

  componentDidMount() {
    this.isMountedVal = 1;
  }

  validateUserToken(token) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Origin': flask_url },
    };

    fetch(flask_url + "/api/user/retrieveUserInfo", requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data.err === "Token has expired"){
        this.logout();
      } else {
        if(this.isMountedVal === 1){
          this.setState({
            userInfo: data
          });
        }
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  grabUserListData(token) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Origin': flask_url },
    };

    fetch(flask_url + "/api/user/lists", requestOptions)
    .then(response => response.json())
    .then(data => {
      if(this.isMountedVal === 1){
        this.setState({
          userListData: data
        });
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentWillUnmount() {
    this.isMountedVal = 0;
  }

  logout() {
    this.setState({
      loggedIn: false,
      token: null
    });
    localStorage.removeItem('token');
  }

  setLoggedIn = (token) => {
    this.setState({
      loggedIn: true,
      token: token
    });
    localStorage.setItem('token', token);
    this.validateUserToken(token);
    this.grabUserListData(token);
  }

  render() {
    return (
      <Router>
        {
          window.location.pathname !== "/life" &&
          <Header loggedIn={this.state.loggedIn} />
        }
        <div className="content">
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/contact" exact component={() => <Contact />} />
            <Route path="/examples" exact component={() => <Examples />} />
            <Route path="/logout" exact component={() => <Logout logout={this.logout}/>} />
            <UnProtectedRoute path="/login" loggedIn={this.state.loggedIn} setLoggedIn={this.setLoggedIn} exact={true} component={Login} />
            <UnProtectedRoute path="/register" loggedIn={this.state.loggedIn} exact={true} component={Register} />
            <ProtectedRoute path="/welcome" loggedIn={this.state.loggedIn} token={this.state.token} logout={this.logout} userInfo={this.state.userInfo} userListData={this.state.userListData} exact={true} component={Welcome}/>
            <ProtectedRoute path="/lists" loggedIn={this.state.loggedIn} userListData={this.state.userListData} grabUserListData={this.grabUserListData} exact={true} component={Lists}/>
            <ProtectedRoute path="/profile" loggedIn={this.state.loggedIn} exact={true} component={Profile}/>
            <ProtectedRoute path="/friends" loggedIn={this.state.loggedIn} exact={true} component={Friends}/>
            <ProtectedRoute path="/calendar" loggedIn={this.state.loggedIn} exact={true} component={Calendar}/>
            <ProtectedRoute path="/settings" loggedIn={this.state.loggedIn} exact={true} component={Settings}/>
            <Route path="/privacy-policy" exact component={() => <PrivacyPolicy />} />
            <Route path="/terms-and-conditions" exact component={() => <TermsAndConditions />} />

            {/* <Route path="/life" exact component={() => <Life />} /> */}

            <Route exact component={() => <FourZeroFour />} />
          </Switch>
        </div>
        {
          window.location.pathname !== "/life" &&
          <Footer />
        }
      </Router>
    );
  }

}

export default App;