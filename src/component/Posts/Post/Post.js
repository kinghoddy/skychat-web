import React, { useState } from 'react';
import classes from './post.css';
import firebase from '../../../firebase';
export default props => {
    let date = 'Dec 12 2019 at 5:30pm'
    var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    var now = new Date(props.date);
    var month = months[now.getMonth()];
    var year = now.getFullYear();
    var monthDay = now.getDate();
    var week = weekDays[now.getDay()];
    var hour = now.getHours();
    var min = dec(now.getMinutes());
<<<<<<< HEAD
=======
    var lastTime = now.getTime();
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
    var clock = " am";
    if (hour > 12) {
        clock = " pm";
        hour -= 12
    }
    function dec(num) {
        if (num < 10) return "0" + num;
        else return num;
    }
    var current = new Date()

    if (current.getDate() === monthDay) {
        date = "Today at " + hour + ":" + min + clock;
    } else if ((current.getDate() - monthDay === 1) || (current.getDate() - monthDay === -30)) {
        date = "Yesterday at " + hour + ":" + min + clock;
    } else if (
        current.getDate() - monthDay > 1 &&
        current.getDate() - monthDay < 7
    ) {
        date = week + " " + hour + ":" + min + clock;
    } else if (year === current.getFullYear()) {
        date =
            month + " " + monthDay + " " + hour + ":" + min + clock;
    } else if (year > current.getFullYear()) {
        date =
            month +
            " " +
            monthDay +
            " " +
            year +
            " at " +
            hour +
            ":" +
            min +
            clock;
    } else {
        date = week + '  ' + hour + ':' + min + clock
    }

<<<<<<< HEAD
=======
    const [showBtn, setShowBtn] = useState(false)
    const like = () => {
        const ref = firebase.database().ref('posts/' + props.id + "/likes/" + props.likeeId)
        if (props.liked) {
            ref.set(null).then(() => {
            })
        } else {
            ref.set(Date.now()).then(() => {
            })
        }
    }
    let likes = []
    if (props.likes) {
        for (let keys in props.likes)
            likes.push(keys)
    }


>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432

    return (
        <div className="mb-3 bg-white" >
            <div className="d-flex align-items-center px-3 py-2">
                <img src={props.icon} alt="" className={classes.icon + " border rounded-circle"} />
                <div className="px-3">

                    <h4 className={classes.coprate + " h5"}>{props.username}</h4>
                    <p className={classes.date}>{date}</p>
                </div>
            </div>
            <h1 className={classes.title + " h3 px-4 py-2 "}>{props.title}</h1>
            {props.body ? <p className="px-3 pb-2" dangerouslySetInnerHTML={{ __html: props.body }}>
            </p> : null
            }
            {
                props.type ? <div className={classes.con}>
<<<<<<< HEAD
                    {props.type === 'img' ?
                        <img alt="" src={props.src} className="border-0" />
                        : null}
                    {props.type === 'vid' ?
                        <video src={props.src}></video>
=======
                    {props.type === 'images' ?
                        <img alt="" src={props.src} className="border-0" />
                        : null}
                    {props.type === 'video' ?
                        <video controls loop src={props.src}></video>
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
                        : null}
                </div> : null
            }

<<<<<<< HEAD
            <div className="border-top d-flex justify-content-around py-2">
                <button className={classes.btn}>
                    <i className="material-icons pr-3">thumb_up</i>
                    Like
                </button>
                <button className={classes.btn}>
                    <i className="material-icons pr-3">comment</i>
                    Comment
                </button>
                <button className={classes.btn}>
                    <i className="material-icons pr-3">share</i>
                    Share
                </button>

=======
            <div className={classes.btnCon + " justify-content-end d-flex  py-2"}>
                <input onBlur={() => {
                    setShowBtn(false)
                }} onFocus={() => {
                    setShowBtn(true)
                }} type="text" placeholder="Comment....." className={classes.comment} value={props.value} onChange={props.changed} required />
                {showBtn ? <button className={classes.btn}>
                    <i className="material-icons ">comment</i>
                    {/* Comment */}
                </button> : <React.Fragment>

                        <button style={{ color: props.liked ? 'gold' : null }} className={classes.btn} onClick={like}>
                            <i className="material-icons ">thumb_up</i>
                            {/* Like */}
                        </button>

                        <button className={classes.btn}>
                            <i className="material-icons ">share</i>
                            {/* Share */}
                        </button>
                    </React.Fragment>}

            </div>
            <div className="d-flex px-4 py-2 align-items-center ">

                <i className="material-icons pr-3 text-warning">thumb_up</i> <span style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize: "1.5rem" }}>{likes.length}</span>
                <i className="material-icons ml-5 pr-3 text-success">comment</i> <span style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize: "1.5rem" }}>{0}</span>
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
            </div>
        </div >

    )

}