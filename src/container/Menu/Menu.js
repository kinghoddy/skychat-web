import React, { Component } from 'react';
import firebase from '../../firebase';
import "firebase/auth";
import Spinner from '../../component/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom'


class Menu extends Component {
    state = {
        loading: false,
        shouldLogout: false
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ loading: true })
            if (user) {
                this.setState({ loading: false, shouldLogout: false })
            } else {
                this.setState({ shouldLogout: true, loading: false })
            }
        });
    }
    logOutHandler = () => {
        this.setState({ loading: true })
        firebase.auth().signOut()
            .then(() => {
                this.setState({ loading: false, shouldLogout: true })
            }).catch((error) => {
                this.setState({ loading: false })
                console.log(error);
                // An error happened.
            });
    }
    render() {
        var menu = <div>
            <h1>Menu </h1>
            <button onClick={this.logOutHandler} className="btn btn-danger btn-xl rounded-pill">Log out</button>
        </div>
        if (this.state.shouldLogout) {
            menu = <Redirect to="/login?menu" />
        }
        return (
            this.state.loading ? <Spinner /> : <div>
                {menu}
            </div>
        )
    }
}

export default Menu