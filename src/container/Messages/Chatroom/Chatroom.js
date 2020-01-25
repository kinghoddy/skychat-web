import React, { Component } from "react";
import classes from "./Chatroom.css";

import { Link, withRouter } from "react-router-dom";
import ChatInput from "../../../component/Forms/chatInput/chatInput";
import Chat from "../../../component/Chats/Chat/Chat";
import Axios from "axios";
import "firebase/database";
import firebase from '../../../firebase';




class Chatroom extends Component {
  state = {
    value: '',
    path: null,
    chats: [
    ],
    receiverData: {
    },
    senderData: {
      senderId: ''
    }

  };
  inputChanged = e => {
    this.setState({ value: e.target.value });
  };
  componentDidMount() {
    var kv = document.cookie.split(';');
    var cookies = {}
    for (var id in kv) {
      var cookie = kv[id].split('=');
      cookies[cookie[0].trim()] = cookie[1]
    }
    var senderdata = { ...this.state.senderData }
    senderdata.senderId = cookies.userId
    this.setState({ senderData: senderdata })

    this.getreceiverData();

  }

  getChat = () => {
    console.log('getchats', this.state.path);
    var updateChat = (snapshot) => {
      const updatedChats = []
      for (let keys in snapshot.val()) {
        var chat = { ...snapshot.val()[keys] }
        updatedChats.push(chat)
      }
      this.setState({ chats: updatedChats })
    }

    var Ref = firebase.database().ref('chats/' + this.state.path);
    Ref.on('value', (snapshot) => {
      updateChat(snapshot)
    });
  }
  startChat = () => {
    var kv = document.cookie.split(';');
    var cookies = {}
    for (var id in kv) {
      var cookie = kv[id].split('=');
      cookies[cookie[0].trim()] = cookie[1]
    }
    var hasChatId = false;
    var chatPath = this.state.receiverData.username + '&' + cookies.username
    var ListRef = firebase.database().ref('users/' + cookies.userId + '/chats');
    ListRef.on('value', s => {
      for (let key in s.val()) {
        if (s.val()[key][0] === chatPath) {
          hasChatId = true
          console.log(s.val()[key][0]);
          this.setState({ path: chatPath })
        }
      }
      if (!hasChatId) {
        console.log('no chats yet');
      } else {
        console.log('has chats');
      }

    });


  }
  updateChatList = () => {
    var kv = document.cookie.split(';');
    var cookies = {}
    for (var id in kv) {
      var cookie = kv[id].split('=');
      cookies[cookie[0].trim()] = cookie[1]
    }
    var senderpath = 'users/' + cookies.userId + '/chats/chats'
    var receiverpath = 'users/' + this.props.match.params.userId + '/chats/chats';
    var newKey = firebase.database().ref().child('chats').push().key;
    var updates = {};
    updates[senderpath + newKey] = [this.state.path];
    updates[receiverpath + newKey] = [this.state.path];
    return firebase.database().ref().update(updates);
  }
  getreceiverData = () => {
    var kv = document.cookie.split(';');
    var cookies = {}
    for (var id in kv) {
      var cookie = kv[id].split('=');
      cookies[cookie[0].trim()] = cookie[1]
    }
    Axios.get('https://skymail-920ab.firebaseio.com/users/' + this.props.match.params.userId + '.json')
      .then(res => {
        const receiverData = { ...this.state.receiverData }
        for (let key in res.data) {
          receiverData[key] = res.data[key]
        }
        this.setState({ receiverData: receiverData })
        var path = this.state.receiverData.username + '&' + cookies.username
        this.startChat()
        this.setState({ path: path })
        this.getChat()
      })
  }

  sendChat = (e) => {
    if (this.state.chats.length === 0) {
      console.log(this.state.chats);
      this.updateChatList()
    }
    e.preventDefault()
    var kv = document.cookie.split(';');
    var cookies = {}
    for (var id in kv) {
      var cookie = kv[id].split('=');
      cookies[cookie[0].trim()] = cookie[1]
    }

    firebase.database().ref('chats/' + this.state.path).push({
      isSender: false,
      message: this.state.value,
      time: "12/12/12",
      seen: true
    }
    ).then(res => {
      console.log(res);

    })
  }

  render() {
    return (
      <div className={classes.chatroom}>
        <nav
          className={
            classes.navbar + " bg-white navbar navbar-expand navbar-light"
          }
        >
          <Link to="" className={classes.icon + " p-0 navbar-brand"}>
            <img src={this.state.receiverData.profilePicture} alt="profile" />
          </Link>
          <h5 className="mb-0">{this.state.receiverData.username}</h5>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="">
                  link
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className={classes.chats}>
          <div>
            {this.state.chats.map((cur, i) => (
              <Chat key={i} seen={cur.seen} time={cur.time} sender={cur.sender} icon={cur.icon}>
                {cur.message}
              </Chat>
            ))}
          </div>
        </div>
        {/* chat input */}
        <ChatInput
          changed={this.inputChanged}
          value={this.state.value}
          sendChat={this.sendChat}
        />
      </div>
    );
  }
}
export default withRouter(Chatroom);

/*

*/
