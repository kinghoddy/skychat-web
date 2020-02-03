import React, { Component } from "react";
import classes from "./Chats.css";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import firebase from "../../firebase";
import Search from "../Forms/Search/Searxh";
import "firebase/database";
import PlaceHolder from "../../container/Messages/PlaceHolder/Placeholder";

class Chat extends Component {
  state = {
    loading: false,
    hasChats: false,
    message: null,
    chats: []
  };

  componentDidMount() {
    this.setState({ loading: true, message: "Connecting to database" });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var userId = user.uid;
        this.getChats(userId, user.displayName);
      } else {
        console.log("no user found");
      }
    });
  }

  getChats = (uid, username) => {
    this.setState({ message: "Fetching user data" });

    var ref = firebase.database().ref("users/" + uid + "/chatsId");
    ref.on("value", s => {
      var chatsId = s.val();
      if (chatsId) {
        this.setState({ message: "Loading Chats", loading: true });
        this.setState({ hasChats: true });
        var chatArr = [];
        for (let keys in chatsId) {
          const cur = chatsId[keys];
          var chatRef = firebase.database().ref("chats/" + cur);
          chatRef.on("value", snap => {
            var user = snap.val().metadata;
            var chats = snap.val().chats;
            var lastChat;
            if (chats) {
              lastChat =
                chats[Object.keys(chats)[Object.keys(chats).length - 1]];
              var lastChatMessage = lastChat.message;
              var lastTime = "";

              var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              var months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ];
              var now = new Date(lastChat.date);
              var month = months[now.getMonth()];
              var year = now.getFullYear();
              var monthDay = now.getDate();
              var week = weekDays[now.getDay()];
              var hour = now.getHours();
              var min = dec(now.getMinutes());
              var clock = " am";
              if (hour > 12) {
                clock = " pm";
                hour -= 12
              }
              function dec(num) {
                if (num < 10) return "0" + num;
                else return num;
              }
              var current = new Date()
              var currentTime = current.getTime();
              var lastTime = now.getTime();
              var difference = (currentTime - lastTime) / 3600000;
              if (current.getDate() === monthDay) {
                lastTime = hour + ":" + min + clock;
              } else if ((current.getDate() - monthDay === 1) || (current.getDate() - monthDay === -30) || (difference > 24 && difference < 48)) {
                lastTime = "Yesterday " + hour + ":" + min + clock;
              } else if (
                current.getDate() - monthDay > 1 &&
                current.getDate() - monthDay < 7
              ) {
                lastTime = week + " " + hour + ":" + min + clock;
              } else if (year === current.getFullYear()) {
                lastTime =
                  month + " " + monthDay + " " + hour + ":" + min + clock;
              } else if (year > current.getFullYear()) {
                lastTime =
                  month +
                  " " +
                  monthDay +
                  " " +
                  year +
                  " at " +
                  hour +
                  ":" +
                  min +
                  clock;
              } else {
                lastTime = week + '  ' + hour + ':' + min + clock
              }

              if (lastChat.sender === username) {
                lastChatMessage = "You: " + lastChat.message;
              }
              for (let key in user) {
                if (key !== uid) {
                  var chat = {
                    chatHead: user[key].username,
                    icon: user[key].profilePicture,
                    link: cur,
                    lastChat: lastChatMessage,
                    time: lastTime
                  };
                  // eslint-disable-next-line no-loop-func
                  chatArr.forEach((cur, i) => {
                    if (cur.chatHead === chat.chatHead) {
                      chatArr.splice(i, 1);
                    }
                  });
                  chatArr.push(chat);
                  this.setState({ chats: chatArr.reverse(), loading: false });
                }
              }
            }
          });
        }
      } else {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    return (
      <div className={classes.Chats + " h-100"}>
        {this.state.loading ? (
          <Spinner size="h6" message={this.state.message} />
        ) : this.state.hasChats ? (
          <React.Fragment>
            <div className="px-3 pt-2">
              <Search />
            </div>
            {this.state.chats.map(cur => (
              <Link
                to={"/messages/" + cur.link}
                className={
                  classes.Chat +
                  " px-3 py-2 text-capitalize  border-bottom d-flex align-items-center"
                }
                key={cur.link}
              >
                <div className={classes.picture}>
                  <img src={cur.icon} alt="chat Icon" />
                </div>
                <div style={{ minWidth: "11rem" }} className="ml-3 text-dark  ">
                  <h3 className=" font-weight-bold h5 m-0">
                    {cur.chatHead
                      ? cur.chatHead
                        .split("<br/>")
                        .join(" ")
                        .substring(0, 15) +
                      (Array.from(cur.chatHead).length > 15 ? "..." : "")
                      : null}
                  </h3>
                  <p className="m-0">
                    {cur.lastChat.split
                      ? cur.lastChat
                        .split("<br/>")
                        .join(" ")
                        .substring(0, 21) +
                      (Array.from(cur.lastChat).length > 21 ? " ..." : "")
                      : null}
                  </p>
                </div>
                <div className="text-right ml-auto">
                  <h6 style={{ color: "#888" }}>{cur.time}</h6>
                  {!cur.seen ? (
                    <i
                      style={{ fontSize: "1rem", color: "orangered" }}
                      className="material-icons pr-1"
                    >
                      radio_button_checked
                    </i>
                  ) : null}
                </div>
              </Link>
            ))}
            <p className="my-4 mx-auto text-secondary text-center">
              No more chats{" "}
            </p>
          </React.Fragment>
        ) : (
              <div className="text-center">
                <PlaceHolder />
              </div>
            )}
      </div>
    );
  }
}
export default Chat;
