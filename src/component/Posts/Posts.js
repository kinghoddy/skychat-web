import React, { Component } from 'react';
import Post from './Post/Post';
import firebase from '../../firebase';
import 'firebase/database';

export default class Posts extends Component {
    state = {
        posts: [
            {
                heading: "Welcome to skychat",
                icon: '',
                body: "Lorem ipsum dollar sign . This is a test post that talks about hte rendering of react elements in the dom"
            }
        ]
    }
    render() {
        return (
            this.state.posts.map(cur => (

                <Post
                    heading={cur.heading}
                    icon={cur.icon}
                    body={cur.body}
                    key={cur.heading}
                    type="image"
                    src={cur.src} />
            ))


        )
    }
}