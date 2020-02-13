import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

import Modal from './component/UI/BtModal/BtModal';
import firebase from './firebase'
import Toast from './component/UI/Toast/Toast';
import { WOW } from 'wowjs';
import asyncComponent from './hoc/asyncComponent';

import 'firebase/messaging';

const Edit = asyncComponent(() => {
  return import('./container/Edit/Edit')
})
const Messages = asyncComponent(() => {
  return import('./container/Messages/Messages')
})
const Home = asyncComponent(() => {
  return import('./container/Home/Home')
})
const Profile = asyncComponent(() => {
  return import('./container/Profile/Profile')
})
const User = asyncComponent(() => {
  return import('./container/User/User')
})

class App extends Component {
  state = {
    toast: null
  }
  componentDidMount() {
    // this.checkOnlineState()
    // this.messageing()
    new WOW().init();
    const light = `:root { --blue: #007bff; --indigo: #6610f2; --purple: #6f42c1; --pink: #e83e8c; --red: #dc3545; --orange: #fd7e14; --yellow: #ffc107; --green: #28a745; --teal: #20c997; --cyan: #17a2b8; --white: #fff; --gray: #eee; --black: #000; --gray-dark: #777; --primary: #007bff; --secondary: #ddd; --success: #28a745; --info: #17a2b8; --warning: #ffc107; --danger: #dc3545; --light: #f9f9f9; --dark: #343a40; --breakpoint-xs: 0; --breakpoint-sm: 576px; --breakpoint-md: 768px; --breakpoint-lg: 992px; --breakpoint-xl: 1200px; --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }`;
    const dark = `:root { --blue: #007bff; --indigo: #6610f2; --purple: #6f42c1; --pink: #e83e8c; --red: #fbeaec; --orange: #fd7e14; --yellow: #ffc107; --green: #28a745; --teal: #20c997; --cyan: #17a2b8; --white: #171e25; --gray: #101010; --gray-dark: #aaa; --primary: #007bff; --secondary: #777; --success: #28a745; --info: #17a2b8; --warning: #ffc107; --danger: #dc3545; --light: #11161b; --dark: #f7f7f7; --black: #fff; --breakpoint-xs: 0; --breakpoint-sm: 576px; --breakpoint-md: 768px; --breakpoint-lg: 992px; --breakpoint-xl: 1200px; --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }`;

    let theme = localStorage.getItem('skychatTheme');
    let domeTheme = light
    if (theme === null) {
      localStorage.setItem('skychatTheme', 'light')
    } else if (theme === 'dark') {
      domeTheme = dark
    }
    console.log(theme);
    const style = document.getElementById('style')
    style.innerHTML = domeTheme
  }

  messageing = () => {
    const messaging = firebase.messaging()
    messaging.requestPermission()
      .then(res => {
        return messaging.getToken()
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
    messaging.onMessage(payload => {
      // console.log(payload);
    })
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
        <style id="style"></style>
        {this.state.toast ? <Toast>{this.state.toast}</Toast> : null}
        <Switch>
          <Route path="/login" exact component={User} />
          <Route path="/signUp" exact component={User} />
          <Route path="/messages/:chatId" component={Messages} />
          <Route path="/messages/" component={Messages} />
          <Redirect from='/undefined' to='/' />
          <Route path="/notifications" exact component={Profile} />
          <Route path="/menu" component={Profile} />
          <Route path="/edit-profile" component={Edit} />
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