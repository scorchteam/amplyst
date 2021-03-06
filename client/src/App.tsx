import { useState, useEffect } from "react";
import { fetchUserInfo, fetchUserListData } from "./UserAuth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer, ProtectedRoute, UnProtectedRoute } from "./components/general";
import {
  Home, About, Contact, Examples, Login, Logout, Register,
  PrivacyPolicy, TermsAndConditions, FourZeroFour, Welcome, Lists,
  Profile, Friends, Calendar, Settings, Forgot, Reset
} from "./components/pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { getListById, ListArray, ListType } from "./lists/ListInterfaces";
import { asyncSubmitEditedList } from "./lists/ListHelpers";

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
  const [activeListId, updateActiveListId] = useState<string>();
  const [activeListData, updateActiveListData] = useState<ListType>();

  useEffect(() => {
    if (loggedIn) {
      fetchUserInfo(userAuthToken, updateUserInfo)
    }
  }, [loggedIn, userAuthToken]);

  useEffect(() => {
    if (userInfo && userInfo.err === "Token has expired") {
      logout();
    } else if (userInfo && loggedIn) {
      fetchUserListData(userAuthToken, updateUserListData);
    }
  }, [userInfo, loggedIn, userAuthToken])

  useEffect(() => {
    console.log(userAuthToken);
  }, [userAuthToken]);

  useEffect(() => {
    if (activeListId && userListData) {
      updateActiveListData(getListById(userListData, activeListId));
    }
  }, [userListData, activeListId]);

  useEffect(() => {
    console.log("check new data", activeListData);
  }, [activeListData]);

  const login = (token: string) => {
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

  const submitEditedList = (editedList: ListType, authToken: string) => {
    console.log("here")
    if (editedList && userAuthToken) {
      console.log(userAuthToken);
      asyncSubmitEditedList(editedList, userAuthToken)
        .then(() => {
          fetchUserListData(userAuthToken, updateUserListData);
        })
    }
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
          <UnProtectedRoute path="/forgot" loggedIn={loggedIn} exact={true} component={Forgot} />
          <UnProtectedRoute path="/reset" loggedIn={loggedIn} exact={true} component={Reset} />
          <ProtectedRoute path="/welcome" loggedIn={loggedIn} token={userAuthToken} logout={logout} userInfo={userInfo} userListData={userListData} exact={true} component={Welcome} />
          <ProtectedRoute path="/lists" loggedIn={loggedIn} userListData={userListData} token={userAuthToken} updateUserListData={updateUserListData} userInfo={userInfo} activeListId={activeListId} updateActiveListId={updateActiveListId} activeListData={activeListData} updateActiveListData={updateActiveListData} submitEditedList={submitEditedList} exact={true} component={Lists} />
          <ProtectedRoute path="/profile" loggedIn={loggedIn} exact={true} component={Profile} />
          <ProtectedRoute path="/friends" loggedIn={loggedIn} exact={true} component={Friends} />
          <ProtectedRoute path="/calendar" loggedIn={loggedIn} exact={true} component={Calendar} />
          <ProtectedRoute path="/settings" loggedIn={loggedIn} exact={true} component={Settings} />
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
