import React, { Component } from "react";
import classes from "./Messages.css";
import Chats from "../../component/Chats/Chats";
import { Route, withRouter,Link } from "react-router-dom";
import Chatroom from "./Chatroom/Chatroom";
import PlaceHolder from "./PlaceHolder/Placeholder";

class Messages extends Component {
    
    state = {
        chatData: {
            icon: "",
            onlineState: true
        },
        username : ''
  };

  componentWillMount(){
    var kv = document.cookie.split(';');
    var cookies = {}
    for (var id in kv){
        var cookie = kv[id].split('=');
        cookies[cookie[0].trim()] = cookie[1]
    }
    console.log(cookies);
    console.log(this.props);

    if(this.props.match.params.profile === cookies.username){
        console.log(true);
        this.setState({username : this.props.match.params.profile})
    }else{
        this.props.history.goBack()
    }
    
  }
  
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
            <div className={classes.overflow + " col-lg-3 bg-white h-100"}>
            <nav
          className={
            classes.navbar + " bg-white navbar navbar-expand navbar-light"
          }
        >
          <Link to="" className={classes.icon + " p-0 navbar-brand"}>
            <img src={this.props.icon} alt="profile" />
          </Link>
          <h5 className="mb-0">{this.state.username}</h5>
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
     
                <Chats clicked={this.getChatData} />
            </div>
            <div className={"h-100 col-lg-9 h-100"}>
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
