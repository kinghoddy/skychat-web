import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route,Switch } from 'react-router-dom';
import * as firebase from "firebase/app";

import Layout from './component/Layout/Layout';
import Profile from './container/Profile/Profile';
import User from './container/User/User';
import Messages from './container/Messages/Messages'


class App extends Component {
  componentDidMount(){
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

        <Layout>
          <Switch>
          <Route path="/login" exact component={User} />
          <Route path="/signUp" exact component={User} />
          <Route path="/messages"  component={Messages} />
          <Route path="/:profile" exact component={Profile} />
          {/* <Redirect from='/' to='/messages' /> */}
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App