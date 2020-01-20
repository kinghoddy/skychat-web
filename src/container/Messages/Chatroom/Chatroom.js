import React, { Component } from "react";
import classes from "./Chatroom.css";

import { Link, withRouter } from "react-router-dom";
import ChatInput from "../../../component/Forms/chatInput/chatInput";

class Chatroom extends Component {
  state = {
    value: "",
    chats: [
      {
        sender: "odunmilade",
        message: "Hello, how are you",
        time: "12/12/12",
        seen: true
      },
      {
        sender: "oluwakemi",
        message: "Hello, how are you",
        time: "12/12/12",
        seen: true
      }
    ],
    icon: "",
  };
  inputChanged = e => {
    this.setState({ value: e.target.value });
  };
  componentDidMount() {
    
    this.setState({
      icon: this.props.icon
    });
  }
  componentDidUpdate() {
  }

  sendChat = () => {};

  render() {
    return (
      <div className={classes.chatroom}>
        <nav className="bg-white navbar navbar-expand navbar-light">
          <Link to="" className={classes.icon + " p-0 navbar-brand"}>
            <img src={this.props.icon} alt="profile" />
          </Link>
          <h5 className="mb-0">{this.props.match.params.chatHead}</h5>
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
            <span>chatroom</span>
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
