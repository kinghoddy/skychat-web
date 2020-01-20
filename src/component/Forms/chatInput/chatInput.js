import React from 'react';
import classes from './chatInput.css'

const chatInput = props =>{
return (
    <div className={classes.msgInput + " row no-gutters"}>
    <div className="col-11">
    <input type="text" onChange={props.changed} value={props.value} placeholder="Type your message" />
    </div>
    <div className="col-1  d-flex align-items-center align-self-stretch">
      <button onClick={props.sendChat} className="w-100 p-0 d-flex align-items-center" style={{
        border : 0,
        background: 'none'
      }}>
        <i className="material-icons h-100 mx-auto" style={{
          fontSize : '2.5rem',
          lineHeight : '1',
          color :'orangered'
        }}>send</i>
      </button>
    </div>
  </div>
)
}

export default chatInput