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
    var lastTime = now.getTime();
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
        date = week + " at " + hour + ":" + min + clock;
    } else if (year === current.getFullYear()) {
        date =
            month + " " + monthDay + " at " + monthDay + " " + hour + ":" + min + clock;
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
            firebase.database().ref('users/' + keys).on('value', s => {
                let user = s.val()
                likes.push(user)
            })
    }
    const lastLike = likes[likes.length - 1]
    console.log(lastLike);




    return (
        <div className="mb-3 bg-white" >
            <div className="d-flex align-items-center px-3 py-2">
                <img src={props.icon} alt="" className={classes.icon + " border rounded-circle"} />
                <div className="px-3">

                    <h4 className={classes.coprate + " h5"}>{props.username}</h4>
                    <p className={classes.date}>{date}</p>
                </div>
                <i className="material-icons ml-auto">more</i>
            </div>
            {props.title ?
                <h1 className={classes.title + " h3 px-4 py-2 "}>{props.title}</h1> : null}
            {props.body ? <p className="px-3 pb-2" dangerouslySetInnerHTML={{ __html: props.body }}>
            </p> : null
            }
            {
                props.type ? <div className={classes.con}>
                    {props.type === 'images' ?
                        <img alt="" src={props.src} className="border-0" />
                        : null}
                    {props.type === 'video' ?
                        <video controls loop src={props.src}></video>
                        : null}
                </div> : null
            }

            <div className={classes.btnCon + " justify-content-end d-flex align-items-center  py-2"}>
                <input onBlur={() => {
                    setShowBtn(false)
                }} onFocus={() => {
                    setShowBtn(true)
                }} type="text" placeholder="Comment....." className={classes.comment} value={props.value} onChange={props.changed} required />
                {showBtn ? <button className={classes.btn}>
                    <i className="material-icons ">comment</i>
                    {/* Comment */}
                </button> : <React.Fragment>
                        <i className="material-icons ml-3 pr-2 text-success">comment</i> <span style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize: "1.3rem" }}>{0}</span>
                        <button style={{ color: props.liked ? 'gold' : null }} className={classes.btn} onClick={like}>
                            <i className="material-icons ">thumb_up</i>
                            {/* Like */}
                        </button>
                        <span style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize: "1.3rem" }}>{likes.length}</span>

                        <button className={classes.btn}>
                            <i className="material-icons ">share</i>
                            {/* Share */}
                        </button>
                    </React.Fragment>}

            </div>
            <div className="d-flex px-3 py-2 align-items-center ">

                {lastLike ?
                    <span className="ml-auto">
                        Liked by  <strong className="text-capitalize px-1"> {lastLike.username} </strong>  {likes.length - 1 > 0 ? <React.Fragment>and <strong className=" px-1"> {likes.length - 1} </strong> other(s)</React.Fragment> : null}
                    </span> : null}
            </div>

        </div >

    )

}