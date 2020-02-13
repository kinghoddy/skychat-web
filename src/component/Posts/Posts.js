import React, { Component } from 'react';
import Post from './Post/Post';
import firebase from '../../firebase';
import 'firebase/database';
import 'firebase/auth';

import Toast from '../UI/Toast/Toast'
import Spinner from '../UI/Spinner/Spinner'

export default class Posts extends Component {
    state = {
        posts: [],
        loading: false
    }

    componentDidMount() {
        // this.setState({loading : true})
        const user = firebase.auth().currentUser
        if (user) {
        }
        this.getPosts(this.props.uid)
    }
    componentDidUpdate() {
        if (this.state.uid !== this.props.uid) {
            this.setState({ uid: this.props.uid })
            this.getPosts(this.props.uid)
        }
    }
<<<<<<< HEAD
=======

>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
    getPosts = (uid) => {
        this.setState({ loading: true })
        const ref = firebase.database().ref('posts/').orderByChild('uid').equalTo(uid)
        ref.on('value', s => {
            const posts = []
            for (let key in s.val()) {
                const post = {
                    title: s.val()[key].title,
                    body: s.val()[key].body,
<<<<<<< HEAD
=======
                    id: key,
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
                    icon: s.val()[key].icon,
                    username: s.val()[key].username,
                    date: s.val()[key].date,
                    type: s.val()[key].type,
<<<<<<< HEAD
                    src: s.val()[key].src,
                }
=======
                    liked: false,
                    likes: s.val()[key].likes,
                    src: s.val()[key].src,
                }
                if (post.likes) {

                    if (post.likes[this.props.likeeId]) {
                        post.liked = true
                    }
                }
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
                posts.push(post)
            }
            this.setState({ posts: posts.reverse(), loading: false })

        })
    }
    render() {
        return (
            this.state.loading ? <div style={{ height: "5rem" }}><Spinner fontSize="3px" /></div> : <div className="pt-2 ">
                {this.state.toast ? <Toast message={this.setState.toast} /> : null}
                <h4 className="pl-4 py-3 bg-white m-0">Posts <small>{this.state.posts.length}</small> </h4>
                {this.state.posts.map(cur => (

                    <Post
<<<<<<< HEAD
                        title={cur.title}
                        username={cur.username}
                        icon={cur.icon}
                        body={cur.body}
                        key={cur.date}
                        date={cur.date}
                        type={cur.type}
                        src={cur.src} />
=======

                        {...cur}
                        key={cur.id}
                        likeeId={this.props.likeeId}
                    />
>>>>>>> 3133f985b69791eda1883a2f7977345286f0d432
                ))}
                <p>No more posts </p>

            </div>
        )
    }
}