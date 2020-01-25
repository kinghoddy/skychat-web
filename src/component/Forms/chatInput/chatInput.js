import React from 'react';
import classes from './chatInput.css'

const chatInput = props => {
  return (
    <form onSubmit={props.sendChat} className={classes.msgInput + " row no-gutters"}>
      <div className="col-md-11 col-10">
        <input type="text" required onChange={props.changed} value={props.value} placeholder="Type your message" />
      </div>
      <div className="col-md-1 col-2  d-flex align-items-center align-self-stretch">
        <button className="w-100 p-0 d-flex align-items-center" style={{
          border: 0,
          background: 'none'
        }}>
          <i className="material-icons h-100 mx-auto" style={{
            fontSize: '2.5rem',
            lineHeight: '1',
            color: 'orangered'
          }}>send</i>
        </button>
      </div>
    </form>
  )
}

export default chatInput