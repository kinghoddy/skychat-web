import React from 'react';
import classes from './NewPost.css'

const chatInput = props => {
  const input = React.createRef()

  const changeHeight = (e) => {
    input.current.style.height = input.current.scrollHeight + 'px'
  }

  return (
    <form onSubmit={props.sendPost} className={classes.msgInput + " mt-2 row no-gutters"}>
      <div className="col-12">
        <h5>Add new post</h5>
      </div>
      <div className="col-md-11 col-10">
        <textarea id="newPostForm" ref={input}
          onInput={changeHeight}
          rows="1"
          type="text" required onChange={props.changed}
          value={props.value} placeholder="Write a post" />
      </div>
      <div className="col-md-1 col-2 pb-1  d-flex align-items-center" style={{ alignSelf: "flex-end" }}>
        <button className="w-100 p-0 d-flex align-items-center" style={{
          border: 0,
          outline: 0,
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