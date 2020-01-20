import React, { Component } from "react";
import classes from "./Chats.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Chat extends Component {
  state = {
    hasChats: false,
    chats : null
  };

  componentDidMount() {
    var kv = document.cookie.split(";");
    var cookies = {};
    for (var id in kv) {
      var cookie = kv[id].split("=");
      cookies[cookie[0].trim()] = cookie[1];
    }
    axios.get("https://skymail-920ab.firebaseio.com/users.json").then(res => {
      var myChats = {};
      var randomChat = [];
      for (var key in res.data) {
          randomChat.push({
            username : res.data[key].username,
            lastChat : 'You are now connected with ' + res.data[key].username,
            picture : res.data[key].profilePicture
          })
  
          if (cookies.username === res.data[key].username) {
              myChats = res.data[key].chats
              this.setState({chats : myChats})
            console.log(myChats);
        }
    }
    if(myChats !== undefined){
        this.setState({hasChats : true,chats: myChats})
    }else{
        this.setState({chats : randomChat})
    }
    console.log(this.state.chats);

});
  }

  chatClickedHandler = ()=>{

  }

  render() {
      var chats = <p>Loading</p>
      if(this.state.chats){
        chats = this.state.chats.map(cur =>(
            <Link
            to={"/messages/" + cur.username}
            className={classes.Chats + " px-3 py-2  border-bottom d-flex align-items-center"}
            key={cur.username}
            onClick={()=>{
              this.props.clicked(cur.picture)
            }}
            >
            <div className={classes.picture}>
              <img src={cur.picture} alt="chat Icon" />
            </div>
            <div className = "ml-3 text-dark">
              <h5 className="font-weight-bold">{cur.username}</h5>
              <p className="m-0">{cur.lastChat}</p>
            </div>
          </Link>
         ))
        }
    
   return (
       <div>
           { this.state.hasChats ? null : <p className="text-center">Select a chat</p>}
           
           {chats}
       </div>
   )
 
}
}
export default Chat;

