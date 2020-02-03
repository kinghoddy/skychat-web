import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

import Profile from './container/Profile/Profile';
import User from './container/User/User';
import Messages from './container/Messages/Messages';
import Home from './container/Home/Home';
import Modal from './component/UI/BtModal/BtModal';
import firebase from './firebase'
import Toast from './component/UI/Toast/Toast';


class App extends Component {
  state = {
    toast: null
  }
  componentDidMount() {
    this.checkOnlineState()
  }

  checkOnlineState = () => {

    var myConnectionsRef = firebase.database().ref('users/joe/connections');

    // stores the timestamp of my last disconnect (the last time I was seen online)
    var lastOnlineRef = firebase.database().ref('users/joe/lastOnline');

    var connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', function (snap) {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
        var con = myConnectionsRef.push();

        // When I disconnect, remove this device
        con.onDisconnect().remove();

        // Add this device to my connections list
        // this value could contain info about the device or a timestamp too
        con.set(true);

        // When I disconnect, update the last time I was seen online
        lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
      }
    });
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
        {this.state.toast ? <Toast>{this.state.toast}</Toast> : null}
        <Switch>
          <Route path="/login" exact component={User} />
          <Route path="/signUp" exact component={User} />
          <Route path="/messages/:chatId" component={Messages} />
          <Route path="/messages/" component={Messages} />
          <Redirect from='/undefined' to='/' />
          <Route path="/notifications" exact component={Profile} />
          <Route path="/menu" component={Profile} />
          <Route path="/:profile" exact component={Profile} />
          <Route path="/" component={Home} />
          <Route render={() => (<h1>Not found</h1>)} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App



/*


<ReactMic
  record={boolean}         // defaults -> false.  Set to true to begin recording
  className={string}       // provide css class name
  onStop={function}        // callback to execute when audio stops recording
  onData={function}        // callback to execute when chunk of audio data is available
  strokeColor={string}     // sound wave color
  backgroundColor={string} // background color
/>




*/