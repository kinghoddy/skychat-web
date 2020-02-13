import React from 'react';
import classes from './post.css'
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
                    {props.type === 'img' ?
                        <img alt="" src={props.src} className="border-0" />
                        : null}
                    {props.type === 'vid' ?
                        <video src={props.src}></video>
                        : null}
                </div> : null
            }

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

            </div>
        </div >

    )

}