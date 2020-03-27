import React, { Component } from 'react';
import classes from './feed.css';
import firebase from '../../firebase';
import { withRouter } from 'react-router-dom'
import 'firebase/auth';
import Spinner from '../UI/Spinner/Spinner';
import Toast from '../UI/Toast/Toast'
import Post from '../Posts/Post/Post'

class Feed extends Component {
    state = {
        loading: false,
        userData: {},
        posts: []

    }
    componentDidMount() {
        const user = firebase.auth().currentUser
        this.setState({ loading: true });
        if (user) {
            const userdata = {
                ...this.state.userData
            };
            userdata.profilePicture = user.photoURL;
            userdata.uid = user.uid;
            userdata.username = user.displayName.toLowerCase();

            this.setState({
                loading: false,
                shouldLogout: false,
                userData: userdata
            });
        } else {
            this.setState({ shouldLogout: true, loading: false });
        }
        document.title = "News feed | Skychat";
        var metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", ' #fff');
        if (this.props.uid) {

            this.getPosts()
        }

    }
    deletePost = (id, src) => {
        if (src) {
            var desertRef = firebase.storage().ref(src);
            desertRef.delete().then(() => {
                firebase.database().ref('posts/' + id).set(null)
            })
        } else {
            firebase.database().ref('posts/' + id).set(null)
        }
    }
    getPosts = () => {
        this.setState({ loading: true })
        const ref = firebase.database().ref('users/')
        ref.child(this.props.uid).on('value', s => {

            let friendsId = s.val()['friendsId']
            let friendsArr = [this.props.uid]
            for (let key in friendsId) {
                friendsArr.push(friendsId[key])
            }

            const feedRef = firebase.database().ref('posts/')
            feedRef.on('value', snap => {
                const Posts = []
                for (let key in snap.val()) {

                    friendsArr.forEach(cur => {
                        if (snap.val()[key].uid === cur) {

                            const post = {
                                title: snap.val()[key].title,
                                body: snap.val()[key].body,
                                id: key,
                                icon: snap.val()[key].icon,
                                username: snap.val()[key].username,
                                date: snap.val()[key].date,
                                type: snap.val()[key].type,
                                liked: false,
                                uid: snap.val()[key].uid,
                                storageRef: snap.val()[key].storageRef,
                                likes: snap.val()[key].likes,
                                src: snap.val()[key].src,
                            }

                            ref.child(snap.val()[key].uid).once('value', sn => {
                                post.icon = sn.val().profilePicture
                                post.username = sn.val().username
                            })
                            if (snap.val()[key].uid === this.props.uid) {
                                post.isMine = true
                            }
                            if (post.likes) {
                                if (post.likes[this.props.uid]) {
                                    post.liked = true
                                }
                            }
                            Posts.push(post)
                        }
                    })

                }
                // setTimeout(() => {
                this.setState({ posts: Posts.reverse(), loading: false })
                // }, 2)


            })
        })
    }
    componentDidUpdate() {
        if (this.state.shouldLogout) {
            this.props.history.push('/login?feed')
        }
    }
    render() {
        return (
            <div className="pt-2 ">
                {this.state.toast ? <Toast message={this.setState.toast} /> : null}
                <h4 className="pl-4 py-3 bg-white h6 m-0">Posts from you and your friends <small>{this.state.posts.length}</small> </h4>

                {this.state.loading ? <div style={{ height: "5rem" }}><Spinner fontSize="3px" /></div> : this.state.posts.map(cur => (

                    <Post

                        {...cur}
                        key={cur.id}
                        deletePost={() => { this.deletePost(cur.id, cur.storageRef) }}
                        likeeId={this.props.uid}
                    />
                ))}
                <p className="text-center">No more posts </p>

            </div>
        )
    }
}
export default withRouter(Feed)