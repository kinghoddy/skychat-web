import React from 'react';
import classes from './post.css'
export default props => {
    const date = 'Dec 12 2019 at 5:30pm'
    return (
        <div className="mb-3 bg-white" >
            <div className="d-flex align-items-center px-3 py-2">
                <img src={props.icon} alt="" className={classes.icon + " border rounded-circle"} />
                <div className="px-3">

                    <h4 className={classes.coprate}>{props.username}</h4>
                    <p className={classes.date}>{date}</p>
                </div>
            </div>
            <h1 className="h3 px-4 border-top">{props.heading}</h1>
            {props.body ? <p className="px-3">
                {props.body}
            </p> : null}
            <div className={classes.con}>
                {props.type === 'img' ?
                    <img alt="" src={props.src} className="border-0" />
                    : null}
                {props.type === 'vid' ?
                    <video src={props.src}></video>
                    : null}
            </div>
        </div>

    )

}