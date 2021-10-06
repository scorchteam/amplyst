import { useState, useEffect } from "react";
import { fetchUserInfo, fetchUserListData } from "./UserAuth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer, ProtectedRoute, UnProtectedRoute } from "./components/general";
import {
  Home, About, Contact, Examples, Login, Logout, Register,
  PrivacyPolicy, TermsAndConditions, FourZeroFour, Welcome, Lists,
  Profile, Friends, Calendar, Settings
} from "./components/pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { User } from "./UserInterface";
import ListArray from "./lists/ListArray";

// export const flask_url = "https://giftlists-api.herokuapp.com";
export const flask_url = "http://localhost:5000";

const App = () => {

  //Grab User auth token
  const authToken = localStorage.getItem('token');

  //State vars
  const [loggedIn, updateLoggedIn] = useState(authToken !== null);
  const [userAuthToken, updateUserAuthToken] = useState(authToken);
  const [userInfo, updateUserInfo] = useState<any>();
  const [userListData, updateUserListData] = useState<ListArray>();

  useEffect(() => {
    if (loggedIn) {
      fetchUserInfo(userAuthToken, updateUserInfo)
    }
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.err === "Token has expired") {
      logout();
    } else if (userInfo && loggedIn) {
      fetchUserListData(userAuthToken, updateUserListData);
    }
  }, [userInfo])

  useEffect(() => {
    console.log(userInfo, userListData)
  }, [userInfo, userListData])

  const login = (token : string) => {
    updateLoggedIn(true);
    updateUserAuthToken(token);
    localStorage.setItem('token', token);
    fetchUserInfo(token, updateUserInfo);
  }

  const logout = () => {
    updateLoggedIn(false);
    updateUserAuthToken(null);
    localStorage.removeItem('token');
  }

  return (
    <Router>
      <Header loggedIn={loggedIn} />
      <section className="content">
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/examples" exact component={() => <Examples />} />
          <Route path="/logout" exact component={() => <Logout logout={logout} />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <UnProtectedRoute path="/login" loggedIn={loggedIn} setLoggedIn={login} exact={true} component={Login} />
          <UnProtectedRoute path="/register" loggedIn={loggedIn} exact={true} component={Register} />
          <ProtectedRoute path="/welcome" loggedIn={loggedIn} token={userAuthToken} logout={logout} userInfo={userInfo} userListData={userListData} exact={true} component={Welcome}/>
          <ProtectedRoute path="/lists" loggedIn={loggedIn} userListData={userListData} token={userAuthToken} grabUserListData={updateUserListData} userInfo={userInfo} exact={true} component={Lists}/>
          <ProtectedRoute path="/profile" loggedIn={loggedIn} exact={true} component={Profile}/>
          <ProtectedRoute path="/friends" loggedIn={loggedIn} exact={true} component={Friends}/>
          <ProtectedRoute path="/calendar" loggedIn={loggedIn} exact={true} component={Calendar}/>
          <ProtectedRoute path="/settings" loggedIn={loggedIn} exact={true} component={Settings}/>
          <Route path="/privacy-policy" exact component={() => <PrivacyPolicy />} />
          <Route path="/terms-and-conditions" exact component={() => <TermsAndConditions />} />

          <Route exact component={() => <FourZeroFour />} />
        </Switch>
      </section>
      <Footer />
    </Router>
  );
}

export default App;