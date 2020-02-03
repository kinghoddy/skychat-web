import React, { Component } from 'react';
import Post from './Post/Post';
import firebase from '../../firebase';
import 'firebase/database';

export default class Posts extends Component {
    state = {
        posts: [
            {
                heading: "Welcome to skychat first post",
                icon: '',
                username: "Seyi bilewomo",
                body: "Lorem ipsum dollar sign . This is a test post that talks about hte rendering of react elements in the dom",
                type: "img"
            },
            {
                type: "vid",
                heading: "Welcome to skychat",
                body: "Lorem ipsum dollar sign . This is a test post that talks about hte rendering of react elements in the dom Lorem ipsum  . This is a test post that talks about hte rendering of react elements in the dom"
            }
        ]
    }
    render() {
        return (
            <div className="pt-2 overflow-hidden">
                <h4 className="pl-4 py-3 bg-white m-0">Posts</h4>
                {this.state.posts.map(cur => (

                    <Post
                        heading={cur.heading}
                        username={cur.username}
                        icon={cur.icon}
                        body={cur.body}
                        key={cur.heading}
                        date={cur.date}
                        type={cur.type}
                        src={cur.src} />
                ))}

            </div>
        )
    }
}