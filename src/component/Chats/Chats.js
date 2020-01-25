import React, { Component } from "react";
import classes from "./Chats.css";
import { Link } from "react-router-dom";
import Spinner from '../UI/Spinner/Spinner';
import firebase from '../../firebase';
import 'firebase/database';
import PlaceHolder from '../../container/Messages/PlaceHolder/Placeholder'

class Chat extends Component {
  state = {
    loading: false,
    hasChats: false,
    message: null,
    chats: []
  };

  componentDidMount() {
    this.setState({ loading: true, message: 'Connecting to database' })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var userId = user.uid
        this.getChats(userId);
      } else {
        console.log('no user found');
      }
    })

  }

  getChats = (uid) => {
    this.setState({ message: 'Fetching user data' })

    var ref = firebase.database().ref('users/' + uid + '/chatsId')
    ref.on('value', s => {
      var chatsId = s.val()
      if (chatsId) {
        this.setState({ message: 'Loading Chats', loading: true })
        this.setState({ hasChats: true })
        var chatArr = []
        chatsId.forEach(cur => {
          var chatRef = firebase.database().ref('chats/' + cur)
          chatRef.on('value', snap => {
            var user = snap.val()
            for (let key in user.metadata) {
              if (key !== uid) {
                var chat = {
                  chatHead: user.metadata[key].username,
                  icon: user.metadata[key].profilePicture,
                  link: cur
                }

                chatArr.push(chat)
                this.setState({ chats: chatArr, loading: false })

              }
            }

          })

        })
      } else {
        this.setState({ loading: false })
      }
    })
  }





  render() {

    return (
      <div className={classes.chats + ' h-100'}>
        {this.state.loading ? <Spinner size="h6" message={this.state.message} /> :
          this.state.hasChats ? this.state.chats.map(cur => (
            <Link
              to={"/messages/" + cur.link}
              className={classes.Chat + " px-3 py-2  border-bottom d-flex align-items-center"}
              key={cur}
            >
              <div className={classes.picture}>
                <img src={cur.icon} alt="chat Icon" />
              </div>
              <div className="ml-3 text-dark">
                <h5 className="font-weight-bold">{cur.chatHead}</h5>
                <p className="m-0">Last chat</p>
              </div>
            </Link>
          )) : <div className="text-center">
              <PlaceHolder />
            </div>
        }

      </div>
    )

  }
}
export default Chat;

