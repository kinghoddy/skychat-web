import React, { Component } from "react";
import classes from "./Messages.css";
import Chats from "../../component/Chats/Chats";
import { Route, withRouter } from "react-router-dom";
import Chatroom from "./Chatroom/Chatroom";
import PlaceHolder from "./PlaceHolder/Placeholder";

class Messages extends Component {
  state = {
    chatData: {
      icon: "",
      onlineState: true
    }
  };

  getChatData = icon => {
    const chatdata = {
      ...this.state.chatData
    };
    chatdata.icon = icon;
    this.setState({ chatData: { ...chatdata } });
  };
  render() {
    return (
      <div className={classes.Messages}>
        <div className="container-fluid h-100 p-0">
          <div className="row h-100 no-gutters">
            <div className={classes.overflow + " col-md-4 bg-white h-100"}>
              <Chats clicked={this.getChatData} />
            </div>
            <div className={"h-100 col-md-8 h-100"}>
              <Route path="/:profile/messages" exact component={PlaceHolder} />
              <Route
                path="/:profile/messages/:chatHead"
                render={() => <Chatroom {...this.state.chatData} />}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Messages);
