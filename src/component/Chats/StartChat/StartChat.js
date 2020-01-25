import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios';

class StartChat extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        Axios.get('https://skymail-920ab.firebaseio.com/users.json')
            .then(res => {
                const users = []
                for (let key in res.data) {
                    const user = {}
                    user.username = res.data[key].username
                    user.userId = key
                    user.profilePicture = res.data[key].profilePicture
                    users.push(user)
                }
                this.setState({ users: users })
            })
            .catch(res => {
                console.log(res);
            })
    }

    render() {

        return (
            <div className="">
                {this.state.users.map(cur => (
                    <Link to={'/messages/' + cur.userId} className="text-dark px-3 py-1 d-block" key={cur.userId}>
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