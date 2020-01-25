import React, { Component } from 'react'
import classes from './Profile.css';
import { Route, Switch } from 'react-router-dom'
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import Alert from '../../component/UI/Alert/Alert';
import Timeline from './Timeline/Timeline';
import Spinner from '../../component/UI/Spinner/Spinner';
import Menu from '../Menu/Menu';


import firebase from '../../firebase';
import 'firebase/auth'


class Profile extends Component {
    state = {
        userData: {
            username: '',
        },
        profileData: {
            username: '',
            coverPhoto: '',
            friendsId: [],
            friendsData: []
        },

        isUser: false,
        loading: false,
        errorMessage: null,
        modalMessage: null
    }
    componentDidMount() {
        this.loadUserdata()
    }
    loadUserdata = () => {
        this.setState({ loading: true })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const updatedUd = {
                    username: user.displayName,
                    email: user.email,
                    profilePicture: user.photoURL,
                    uid: user.uid
                }
                // fetch the profile data
                const userdata = {
                    ...this.state.userdata
                }
                for (let keys in updatedUd) {
                    userdata[keys] = updatedUd[keys]
                }
                this.setState({
                    userData: userdata, loading: false
                })
            } else {
                this.setState({ modalMessage: 'You are not logged in', loading: false })
            }
        })
    }
    render() {
        return (
            <div className={classes.Profile}>
                <Toolbar profile={this.state.profileData.username} />

                {this.state.loading ?
                    <div style={{ height: '80vh' }}><Spinner /></div> : <React.Fragment>
                        {this.state.errorMessage ? <Alert type="danger" show={true}>{this.state.errorMessage}</Alert> : ''}
                        {this.state.modalMessage ? <Alert show={true} type="info">{this.state.modalMessage}</Alert> : ''}

                        <Switch>
                            <Route path='/notifications' exact render={() => (<h1>Notify</h1>)} />
                            <Route path='/menu' exact render={() => (<Menu {...this.props} />)} />
                            <Route path='/:profile' exact render={() => (<Timeline profile={this.props.match.params.profile}  {...this.state} />)} />
                        </Switch>
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default Profile

