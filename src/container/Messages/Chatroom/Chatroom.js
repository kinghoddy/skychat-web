import React, { Component } from "react";
import classes from "./Chatroom.css";

import { Link, withRouter } from "react-router-dom";
import ChatInput from "../../../component/Forms/chatInput/chatInput";
import Chat from "../../../component/Chats/Chat/Chat";
import "firebase/database";
import "firebase/auth";
import firebase from "../../../firebase";
import Spinner from "../../../component/UI/Spinner/Spinner";

import Play from "../../../component/Audio/Audio";

class Chatroom extends Component {
  state = {
    value: "",
    path: null,
    chats: [],
    receiverData: {},
    senderData: {
      senderId: ""
    },
    loading: false,
    date: null,
    changeStyle: false
  };
  inputChanged = e => {
    this.setState({ value: e.target.value });
  };
  componentDidMount() {
    this.setState({ loading: true });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var senderData = {};
        senderData.senderId = user.uid;
        senderData.username = user.displayName;
        senderData.profilePicture = user.photoURL;
        this.setState({ senderData: senderData });
        this.getChats(this.props.match.params.chatId);
      } else {
        this.setState({ loading: false });
      }
    });
  }
  changeStyle = change => {
    if (this.state.changeStyle !== change) {
      this.setState({ changeStyle: change });

      var con = document.getElementById("scroll");
      if (con) {
        setTimeout(() => {
          con.scrollTop = con.scrollHeight + 100000;
        }, 500);
      }
    }
  };
  componentDidUpdate() {
    if (this.props.match.params.chatId !== this.state.chatId) {
      this.setState({ chatId: this.props.match.params.chatId })
      this.getChats(this.props.match.params.chatId)
    }
  }
  getChats = (chatId) => {
    var ref = firebase.database().ref("chats/" + chatId);
    ref.on("value", s => {
      this.setState({ play: false });
      var chats = s.val().chats;
      if (chats) {
        var chat = [];
        for (let keys in chats) {
          chat.push(chats[keys]);
        }

        var lastChat = chats[Object.keys(chats)[Object.keys(chats).length - 1]];
        if (lastChat.sender !== this.state.senderData.username) {
          this.setState({ play: true });
        }
        this.setState({ chats: chat, date: lastChat.date });
        var con = document.getElementById("scroll");
        if (con) {
          con.scrollTop = con.scrollHeight + 100;
        }
      } else {
        // this.props.history.push('/messages/')
      }
      // get receiver data
      for (let keys in s.val().metadata) {
        if (keys !== this.state.senderData.senderId) {
          var receiverData = {};
          receiverData.profilePicture = s.val().metadata[keys].profilePicture;
          receiverData.username = s.val().metadata[keys].username;
          this.setState({ receiverData: receiverData });
          document.title =
            receiverData.username +
            " And " +
            this.state.senderData.username +
            " | Skychat";
        }
      }
      this.setState({ loading: false });
    });
  };

  sendChats = event => {
    this.setState({ changeStyle: false });
    event.preventDefault();
    var chatId = this.props.match.params.chatId;

    var ref = firebase.database().ref("chats/" + chatId + "/chats");
    var val = this.state.value.split("\n").join("<br/>");
    var dat = Date.now();

    var now = new Date();
    var currentTime = now.getTime();
    var lastTime = new Date(this.state.date).getTime();
    var difference = (currentTime - lastTime) / 1000;
    if (difference > 120) {
      ref.push({
        date: dat,
        message: dat,
        sender: "time"
      });
    }

    ref
      .push({
        date: dat,
        message: val,
        sender: this.state.senderData.username
      })
      .then(res => { })
      .catch(() => {
        console.log("message not sent");
      });
    this.setState({ value: "" });
  };

  render() {
    return (
      <div className={classes.chatroom}>
        <nav
          className={
            classes.navbar + " bg-white navbar navbar-expand navbar-light"
          }
        >
          <Link to="/messages/">
            <i
              style={{ cursor: "pointer" }}
              className="text-dark material-icons mr-2 d-lg-none"
            >
              arrow_back
            </i>
          </Link>
          <Link
            to={"/" + this.state.receiverData.username}
            className={classes.icon + " p-0 navbar-brand"}
          >
            <img src={this.state.receiverData.profilePicture} alt="" />
          </Link>
          {this.state.receiverData.username ? (
            <div>
              <h1 className="mb-0 h5 text-capitalize">
                {this.state.receiverData.username.substring(0, 18) +
                  (Array.from(this.state.receiverData.username).length > 18
                    ? "..."
                    : "")}
              </h1>
              <h6 className="m-0 font-weight-light">Active 3mins ago</h6>
            </div>
          ) : null}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="">
                  <i className="material-icons">info</i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div
          style={
            this.state.changeStyle
              ? { marginBottom: "8.2rem", height: " calc(100% - 8.2rem)" }
              : null
          }
          className={classes.chats}
          id="scroll"
        >
          <div>
            {!this.state.loading ? (
              <div className="py-5 ">
                <div
                  className="mb-3 d-flex justify-content-center"
                  style={{ height: "8rem" }}
                >
                  <img
                    src={this.state.senderData.profilePicture}
                    className="h-100 rounded-circle"
                    alt=""
                  />
                  <img
                    src={this.state.receiverData.profilePicture}
                    className="h-100 rounded-circle"
                    alt=""
                  />
                </div>
                <h2 className="text-center h5">
                  {" "}
                  You and {this.state.receiverData.username} are now friends{" "}
                </h2>
              </div>
            ) : null}
            {this.state.play ? <Play /> : null}
            {this.state.chats.map((cur, i) => {
              return (
                <Chat
                  key={i}
                  seen={cur.seen}
                  date={cur.date}
                  sender={cur.sender}
                  icon={this.state.receiverData.profilePicture}
                >
                  {cur.message}
                </Chat>
              );
            })}
            {this.state.loading ? (
              <div className="pb-3 mb-3">
                <Spinner fontSize="3px" />
              </div>
            ) : null}
          </div>
        </div>
        {/* chat input */}
        <ChatInput
          changeStyle={this.changeStyle}
          changed={this.inputChanged}
          value={this.state.value}
          sendChat={this.sendChats}
        />
      </div>
    );
  }
}
export default withRouter(Chatroom);

/*

*/
