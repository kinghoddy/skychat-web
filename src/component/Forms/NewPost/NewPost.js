import React from 'react';
import classes from './NewPost.css'

const chatInput = props => {
  const input = React.createRef()
  const body = React.createRef()

  const changeHeight = (e) => {
    body.current.style.height = body.current.scrollHeight + 1 + 'px'
  }
  const showForm = () => {
    body.current.style.display = "flex"
  }

  return (
<<<<<<< HEAD
    <form autocomplete="off" onSubmit={props.sendPost} className={classes.msgInput + " mt-2 row no-gutters"}>
=======
    <form autoComplete="off" onSubmit={props.sendPost} className={classes.msgInput + " mt-2 row no-gutters"}>
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
      <div className="col-12">
        <h5> + Add new post</h5>
      </div>
      <div className="col-md-11 col-10">
        <input id="newPostTitle" ref={input}
          onFocus={showForm}
          rows="1"
<<<<<<< HEAD
          type="text" required onChange={props.titleChanged}
=======
          type="text" onChange={props.titleChanged}
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
          value={props.title} placeholder="Write a post" />
        <textarea id="newPostBody" ref={body}
          onInput={changeHeight}
          style={{ display: "none" }}
          rows="1"
          type="text" onChange={props.bodyChanged}
          value={props.body} placeholder="Post body...." />
      </div>
      <div className="col-md-1 col-2 pb-1  d-flex align-items-center" style={{ alignSelf: "flex-start" }}>
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

      {props.src ? <div className={classes.media + " col-12 d-flex mt-3 justify-content-around"}>
        {props.type === 'video' ? <video src={props.src}> </video> : props.type === 'images' ? <img src={props.src} /> : null}
      </div> : null}
      <div className="col-12 d-flex mt-3 justify-content-around">
        <button type="button" onClick={() => (
<<<<<<< HEAD
          props.upload('photo')
=======
          props.upload('images')
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
        )} className={classes.btn}>
          <i className="material-icons text-success pr-2">photo</i>
          Photo
          </button>
        <button type="button" onClick={() => (
          props.upload('video')
        )} className={classes.btn}>
          <i className="material-icons text-danger pr-2">videocam</i>
          Video</button>
      </div>
    </form>
  )
}

export default chatInput