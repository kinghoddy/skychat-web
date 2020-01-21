import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as firebase from "firebase/app";

import Profile from './container/Profile/Profile';
import User from './container/User/User';
import Messages from './container/Messages/Messages'


class App extends Component {
  state = {
    auth: true
  }
  componentDidMount() {
    var firebaseConfig = {
      apiKey: 'AIzaSyCKMoKc1Cft0WG1etZLvnmh5ytzdckkIcg',
      databaseURL: "https://skymail-920ab.firebaseio.com",
      authDomain: "skymail-920ab.firebaseapp.com"
    };

    firebase.initializeApp(firebaseConfig);

  }
  render() {
    return (
      <BrowserRouter>

        <Switch>
          <Route path="/login" exact component={User} />
          <Route path="/signUp" exact component={User} />
          <Route path="/messages" component={Messages} />
          <Route path="/:profile" exact component={Profile} />
          <Redirect from='/' to='/login' />
          <Route render={() => (<h1>Not found</h1>)} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App