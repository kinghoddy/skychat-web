import React, { Component } from 'react';
import classes from './Chat.css';
import firebase from '../../../firebase'

class chat extends Component {

    constructor(props) {
        super(props);
        this.chatRef = React.createRef();
    }
    componentDidMount() {
        let classname = this.chatRef.current.className;

        if (this.chatRef.current.offsetHeight > 55 && this.chatRef.current.offsetHeight < 80) {
            classname = [classname, classes.lg].join(' ')
        } else if (this.chatRef.current.offsetHeight > 80) {
            classname = [classname, classes.lg2].join(' ')
        }

        this.chatRef.current.className = classname

    }
    render() {
        var icon = ''
        var user = firebase.auth().currentUser.displayName
        let classname = classes.sent
        let message = this.props.children

        if (this.props.sender === user) {
            classname = classes.sent
            icon = null
        } else if (this.props.sender === 'time') {
            var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec']
            var now = new Date(this.props.children)
            var month = months[now.getMonth()]
            var year = now.getFullYear()
            var monthDay = now.getDate()
            var week = weekDays[now.getDay()]
            var hour = now.getHours()
            var min = dec(now.getMinutes());
            var clock = ' am'
            if (hour > 12) {
                clock = " pm"
                hour -= 12
            }
            function dec(num) {
                if (num < 10) return '0' + num
                else return num
            }
            classname = classes.time
            icon = null
            var current = new Date()
            var currentTime = current.getTime();
            var lastTime = now.getTime();
            var difference = (currentTime - lastTime) / 3600000;
            if (current.getDate() === monthDay) {
                message = 'Today at ' + hour + ':' + min + clock
            } else if ((current.getDate() - monthDay === 1) || (current.getDate() - monthDay === -30) || (difference > 24 && difference < 48)) {
                message = 'Yesterday at ' + hour + ':' + min + clock
            } else if ((current.getDate() - monthDay) > 1 && current.getDate() - monthDay < 7) {
                message = week + ' at ' + hour + ':' + min + clock
            } else if (year === current.getFullYear() && current.getDate() - monthDay > 7) {
                message = month + ' ' + monthDay + ' at ' + hour + ':' + min + clock
            } else if (year > current.getFullYear()) {
                message = month + ' ' + monthDay + ' ' + year + ' at ' + hour + ':' + min + clock
            } else {
                message = week + ' at ' + hour + ':' + min + clock
            }


        } else if (this.props.sender === 'skymail') {
            classname = classes.skymail
            icon = null
        }
        else {
            classname = classes.received
            icon = <div className={classes.icon + " mr-2 mr-md-2"}>
                <img src={this.props.icon} alt="" />
            </div>
        }


        return (
            <div className="d-flex">
                {icon}
                <div ref={this.chatRef} dangerouslySetInnerHTML={{ __html: message }} className={[classes.chat, classname].join(' ')}>
                </div>
            </div>
        )
    }
}

export default chat
