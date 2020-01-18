import  React from 'react';
import  classes  from './Chats.css';
import {Link} from 'react-router-dom'

const chat = props =>{

  return (
      <Link to={"/messages/" + props.chatHead }className ={classes.Chats + " px-3 bg-white border-bottom d-flex"}>
         <div className={classes.picture}>
             <img src={props.Icon} alt='chat Icon' />
         </div>
         <div>
             <h5>{props.chatHead}</h5>
             <p>{props.lastChat}</p>
         </div>
      </Link>
  )
}
export default chat