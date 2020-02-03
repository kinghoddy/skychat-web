import React, { Component } from 'react';
import classes from './friends.css';
import { Link } from 'react-router-dom';
import 'firebase/database';
import firebase from '../../firebase';
import Spinner from '../../component/UI/Spinner/Spinner'
import Toast from '../UI/Toast/Toast';

class Friends extends Component {
    state = {
        friendsData: [],
        loading: false,
        uid: this.props.uid,
        toast: null
    }
    componentDidMount() {
        this.getFriends(this.props.uid)
    }
    componentDidUpdate() {
        if (this.state.uid !== this.props.uid) {
            this.setState({ uid: this.props.uid })
            this.getFriends(this.props.uid)
        }
    }
    getFriends(uid) {
        if (uid) {
            this.setState({ loading: true })
            var ref = firebase.database().ref('users/' + uid)
            ref.on('value', s => {
                if (s.val().friendsId) {
                    const friendsData = []
                    for (let keys in s.val().friendsId) {
                        firebase.database().ref('users/' + s.val().friendsId[keys])
                            .once('value', snap => {
                                const friend = {
                                    username: snap.val().username,
                                    profilePicture: snap.val().profilePicture,
                                    link: s.val().friendsId[keys]
                                }
                                friendsData.push(friend)
                            })
                    }
                    this.setState({ friendsData: friendsData, loading: false })
                } else {
                    this.setState({ friendsData: [], loading: false })

                }
            })
        }
    }
    render() {
        return (
            this.state.loading ? <Spinner fontSize="3px" /> : this.props.uid ? <div className="container-fluid p-0">
                {this.state.toast ? <Toast>{this.state.toast}</Toast> : null}
                <div className="row bg-white border-bottom no-gutters">
                    <div className="col-12 px-3 d-flex align-items-center">
                        <i className="material-icons md-36 pr-2">perm_identity</i>
                        <h4 className="mb-0">
                            Friends{" "}
                            <span className="pl-2 font-weight-light">
                                {this.state.friendsData.length}
                            </span>
                        </h4>
                    </div>
                    <div className="col-12 px-3">
                        <div className={classes.horizontal_scroll + " row no-gutters "}>
                            {this.state.friendsData.map((cur, i) => (
                                <div className="col-4 col-lg-3 px-2"
                                    key={i}
                                >
                                    <Link
                                        to={"/" + cur.username}
                                        className={classes.friendCard}
                                    >
                                        <div className="card-picture overflow-hidden">
                                            <img
                                                className="card-img-top "
                                                src={cur.profilePicture}
                                                alt="cover"
                                            />
                                        </div>
                                        <div style={{ fontSize: ' .9rem ' }} className="text-dark px-2  py-1 card-body">{cur.username}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> : null
        )
    }
}


export default Friends
