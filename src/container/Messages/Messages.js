import React, { Component } from "react";
import classes from "./Messages.css";
import Chats from "../../component/Chats/Chats";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Chatroom from "./Chatroom/Chatroom";
import PlaceHolder from "./PlaceHolder/Placeholder";
import chatBg from '../../assets/Image/chatBg.jpg';
import StartChat from "../../component/Chats/StartChat/StartChat";
import firebase from '../../firebase';
import 'firebase/auth'

class Messages extends Component {

  state = {
    chatData: {
      icon: "",
      onlineState: true
    },
    userData: {
      username: '',
      chatroomBg: chatBg,
      uid: ''
    },
    shouldLogout: false,
    message: null,
    shouldShowChatroom: false
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ shouldLogout: false })
        this.getUserData(user)
      } else {
        this.setState({ shouldLogout: true })
      }
    });
    if (window.innerWidth >= 1200 || (this.props.match.params.chatId && this.props.match.params.chatId !== 'start-chat')) {
      this.setState({ shouldShowChatroom: true })
    }
  }
  UNSAFE_componentWillReceiveProps() {
    if (window.innerWidth >= 1200 || (this.props.match.params.chatId && this.props.match.params.chatId !== 'start-chat')) {
      this.setState({ shouldShowChatroom: true })
    }
  }

  getUserData = (user) => {
    var ref = firebase.database().ref('users/' + user.uid)
    ref.once('value', s => {
      const userdata = { ...this.state.userData, uid: user.uid }
      for (let keys in s.val()) {
        userdata[keys] = s.val()[keys]
      }
      this.setState({ userData: userdata })
    })
  }





  render() {
    return (
      this.state.shouldLogout ? <Redirect to="/login?messages" /> : <div className={classes.Messages}>
        <div className="container-fluid h-100 p-0">
          <div className="row h-100 no-gutters">
            <div className={classes.left + " col-lg-3 bg-white "}>
              <nav
                className={
                  classes.navbar + " bg-white navbar navbar-expand navbar-light"
                }
              >
                <i onClick={this.props.history.goBack} style={{ cursor: 'pointer' }} className="material-icons mr-2" >arrow_back</i>
                <Link to={"/" + this.state.userData.username} className={classes.icon + " p-0 navbar-brand"}>
                  <img src={this.state.userData.profilePicture} alt="" />
                </Link>
                <h3 className="mb-0">Chats</h3>
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="">
                        <i className="material-icons">settings</i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <div className={classes.overflow + ' h-100'} style={{
                paddingTop: '3.6rem'
              }}>
                <Switch>
                  <Route path="/messages/start-chat" render={() => (<StartChat clicked={this.getChatData} />)} />
                  <Route path="/messages" component={Chats} />
                </Switch>
                <Switch>
                  <Route path="/messages/start-chat" />
                  <Route path="/messages" render={() => (
                    <Link to="/messages/start-chat" className={classes.bubble}>
                      <i className="material-icons">chat_bubble</i>
                    </Link>
                  )} />
                </Switch>
              </div>
            </div>
            {this.state.shouldShowChatroom ?
              <div className={classes.chatroom + " col-lg-9"} style={{
                backgroundImage: ' linear-gradient(to right bottom, rgba(255, 255, 255,.3), rgba(255, 255, 255,.2)), url(' + this.state.userData.chatroomBg + ')'
              }}>
                <Switch>
                  <Route path="/messages/start-chat" component={PlaceHolder} />                 <Route
                    path="/messages/:userId"
                    render={() => <Chatroom />}
                  />
                  <Route path="/messages" component={PlaceHolder} />

                </Switch>
              </div>
              : ''}
          </div>
        </div>

      </div >
    );
  }
}
export default Messages;
