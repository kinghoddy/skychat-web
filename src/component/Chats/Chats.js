import React, { Component } from "react";
import classes from "./Chats.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Spinner from '../UI/Spinner/Spinner'

class Chat extends Component {
  state = {
    loading: false,
    hastChats: false,
  };

  componentDidMount() {
    var kv = document.cookie.split(";");
    var cookies = {};
    for (var id in kv) {
      var cookie = kv[id].split("=");
      cookies[cookie[0].trim()] = cookie[1];
    }
    this.setState({ loading: true })
    axios.get("https://skymail-920ab.firebaseio.com/users/" + cookies.userId + '.json')
      .then(res => {
        this.setState({ loading: false })
        console.log(res.data);
        var chatsData = []
        if (res.data.chats) {
          this.setState({ hasChats: true })
        }
        for (let keys in res.data) {

        }

      })
      .catch(res => {
        this.setState({ loading: false })
      })
  }



  render() {

    return (
      <div className={classes.chats}>
        {this.state.loading ? <Spinner /> :
          this.state.hastChats ? <Link
            to={"/messages/"}
            className={classes.Chat + " px-3 py-2  border-bottom d-flex align-items-center"}

            onClick={() => {
              this.props.clicked()
            }}
          >
            <div className={classes.picture}>
              <img src='' alt="chat Icon" />
            </div>
            <div className="ml-3 text-dark">
              <h5 className="font-weight-bold">username</h5>
              <p className="m-0">Last chat</p>
            </div>
          </Link> : <p className="my-5 text-center h5">No chats yet</p>}

      </div>
    )

  }
}
export default withRouter(Chat);

