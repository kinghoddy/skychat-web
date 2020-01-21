import React, { Component } from "react";
import classes from "./Messages.css";
import Chats from "../../component/Chats/Chats";
import { Route, withRouter, Link } from "react-router-dom";
import Chatroom from "./Chatroom/Chatroom";
import PlaceHolder from "./PlaceHolder/Placeholder";
import axios from 'axios';
import chatBg from '../../assets/Image/chatBg.jpg';
import Spinner from '../../component/UI/Spinner/Spinner'

class Messages extends Component {

  state = {
    chatData: {
      icon: "",
      onlineState: true
    },
    userData: {
      username: '',
      chatroomBg: chatBg
    },
  };

  componentDidMount() {
    console.log(this.props);

    this.getUserData()
  }

  getUserData = () => {
    var kv = document.cookie.split(';');
    var cookies = {}
    for (var id in kv) {
      var cookie = kv[id].split('=');
      cookies[cookie[0].trim()] = cookie[1]
    }
    this.setState({loading: true})
    axios.get('https://skymail-920ab.firebaseio.com/users/' + cookies.userId + '.json')
      .then(res => {
        const userdata = {
          ...this.state.userData
        }
        for (let key in res.data) {
          userdata[key] = res.data[key]
        }
        this.setState({
          userData: userdata,
          loading : false
        })
        console.log(this.state);
      })
  }

  startChat = () => {
    this.setState({ loading: true })
  }

  getChats = () => {

  }

  render() {
    return (
      <div className={classes.Messages}>
        <div className="container-fluid h-100 p-0">
          <div className="row h-100 no-gutters">
            <div className={" col-lg-3 bg-white h-100"}>
              <nav
                className={
                  classes.navbar + " bg-white navbar navbar-expand navbar-light"
                }
              >
                <Link to="" className={classes.icon + " p-0 navbar-brand"}>
                  <img src={this.state.userData.profilePicture} alt="profile" />
                </Link>
                <h3 className="mb-0">Chats</h3>
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
              <div className={classes.overflow + ' h-100'} style={{
                paddingTop: '3.6rem'
              }}>

                <Chats clicked={this.getChatData} />
                <button className={classes.bubble} onClick={this.startChat}>
                  <i className="material-icons">chat_bubble</i>
                </button>
              </div>
            </div>
            <div className={classes.chatroom + "  h-100 col-lg-9 h-100"} style={{
              backgroundImage: ' linear-gradient(to right bottom, rgba(255, 255, 255,.3), rgba(255, 255, 255,.2)), url(' + this.state.userData.chatroomBg + ')'
            }}>
              <Route path="/messages" exact component={PlaceHolder} />
              <Route
                path="/messages/:chatHead"
                render={() => <Chatroom {...this.state.chatData} />}
              />
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default withRouter(Messages);
