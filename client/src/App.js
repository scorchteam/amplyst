import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer, ProtectedRoute, UnProtectedRoute } from "./components/general";
import {
  Home, About, Contact, Examples, Login, Logout, Register,
  PrivacyPolicy, TermsAndConditions, FourZeroFour, Welcome, Lists,
  Profile, Friends, Calendar, Settings
} from "./components/pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// export const flask_url = "https://giftlists-api.herokuapp.com";
// export const flask_url = "http://172.26.99.3:5000";
export const flask_url = "http://localhost:5000";

class App extends Component {

  constructor(props){
    super(props);

    var token = localStorage.getItem('token');

    this.state = {
      loggedIn: (token !== null),
      token: token,
    }

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.setState({
      loggedIn: false,
      token: null
    });
    localStorage.removeItem('token');
    console.log("Removed token");
  }

  setLoggedIn = (token) => {
    this.setState({
      loggedIn: true,
      token: token
    });
    localStorage.setItem('token', token);
    console.log('token set')
  }

  render() {
    return (
      <Router>
        <Header loggedIn={this.state.loggedIn} />
        <div className="content">
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/contact" exact component={() => <Contact />} />
            <Route path="/examples" exact component={() => <Examples />} />
            <Route path="/logout" exact component={() => <Logout logout={this.logout}/>} />
            <UnProtectedRoute path="/login" loggedIn={this.state.loggedIn} setLoggedIn={this.setLoggedIn} exact={true} component={Login} />
            <UnProtectedRoute path="/register" loggedIn={this.state.loggedIn} exact={true} component={Register} />
            <ProtectedRoute path="/welcome" loggedIn={this.state.loggedIn} token={this.state.token} logout={this.logout} exact={true} component={Welcome}/>
            <ProtectedRoute path="/lists" loggedIn={this.state.loggedIn} exact={true} component={Lists}/>
            <ProtectedRoute path="/profile" loggedIn={this.state.loggedIn} exact={true} component={Profile}/>
            <ProtectedRoute path="/friends" loggedIn={this.state.loggedIn} exact={true} component={Friends}/>
            <ProtectedRoute path="/calendar" loggedIn={this.state.loggedIn} exact={true} component={Calendar}/>
            <ProtectedRoute path="/settings" loggedIn={this.state.loggedIn} exact={true} component={Settings}/>
            <Route path="/privacy-policy" exact component={() => <PrivacyPolicy />} />
            <Route path="/terms-and-conditions" exact component={() => <TermsAndConditions />} />

            <Route exact component={() => <FourZeroFour />} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }

}

export default App;