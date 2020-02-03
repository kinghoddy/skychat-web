import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../firebase';
import 'firebase/database';
import Spinner from '../../UI/Spinner/Spinner'

class StartChat extends Component {

    state = {
        users: [],
        loading: false
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        this.setState({ loading: true })
        var ref = firebase.database().ref('users/')
        ref.on('value', s => {
            const users = []
            var uid = s.val()
            for (let key in uid) {
                const user = {}
                user.username = uid[key].username
                user.userId = key
                user.profilePicture = uid[key].profilePicture
                users.push(user)
            }
            this.setState({ users: users, loading: false })

        })
    }

    render() {

        return (
            this.state.loading ? <Spinner /> : <div className="">
                {this.state.users.map(cur => (
                    <Link to={cur.userId} className="text-dark px-3 py-1 d-block" key={cur.userId}>
                        <div className="row">
                            <div className="col-3">
                                <img src={cur.profilePicture} alt="profile" className="rounded-circle border img-fluid" />
                            </div>
                            <p>{cur.username}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}

export default StartChat