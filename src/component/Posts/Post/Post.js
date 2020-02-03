import React from 'react';
import classes from './post.css'
export default props => {

    return (
        <div className="mt-4 bg-white" >
            <div className="d-flex align-items-center px-3">
                <img src={props.icon} alt="" className={classes.icon + " border rounded-circle"} />
                <h1 className="h3 px-3">{props.heading}</h1>
            </div>
            <div>
                {props.body}
            </div>
            {props.image ? <div>
                <img alt="" src={props.src} />
            </div> : null}
            {props.video ? <div>
                <video src={props.src}></video>
            </div> : null}
        </div>

    )

}