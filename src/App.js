import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

import Profile from './container/Profile/Profile';
import User from './container/User/User';
import Messages from './container/Messages/Messages';
import Home from './container/Home/Home';
import Modal from './component/UI/BtModal/BtModal';


class App extends Component {
  componentDidMount() {
    window.addEventListener('load', function (e) {
      if (navigator.onLine) {
        console.log('We\'re online!');
      } else {
        console.log('We\'re offline...');
      }
    }, false);
  }

  toggleFullscreen = () => {
    var con = document.querySelector('body')

    console.log(window); window.blur()
    if (con.webkitRequestFullScreen) {
      con.webkitRequestFullScreen()
    } else if (con.requestFullScreen) con.requestFullScreen()
  }
  render() {
    return (
      <BrowserRouter>
        {window.innerWidth < 1200 ?
          <Modal show={false} click={this.toggleFullscreen} btn="Toggle Fullscreen">
            This app is best enjoyed in fullscreen
        </Modal> : null
        }
        <Switch>
          <Route path="/login" exact component={User} />
          <Route path="/signUp" exact component={User} />
          <Route path="/messages/:chatId" component={Messages} />
          <Route path="/messages/" component={Messages} />
          <Redirect from='/undefined' to='/' />
          <Route path="/:profile" exact component={Profile} />
          <Route path="/" component={Home} />
          <Route render={() => (<h1>Not found</h1>)} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App