import  React, {Component} from 'react';
import  classes  from './Chatroom.css';
// import {Link } from 'react-router-dom';
// import Input from '../../../component/UI/Input/Input'

class Chatroom extends Component{
    // console.log(props);
    render(){
      return (
        <div className ={classes.chatroom}>
    <h1>chatroom</h1>
    <div className={"fixed-bottom bg-white"}>
        <input  type="text" placeholder="Type your message" className={classes.msgInput}/>
    </div>
      </div>
  )
}
}
export default Chatroom