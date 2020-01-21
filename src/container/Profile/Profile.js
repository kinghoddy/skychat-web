import React, { Component } from 'react'
import classes from './Profile.css';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import Alert from '../../component/UI/Alert/Alert';
import Timeline from './Timeline/Timeline';
import Spinner from '../../component/UI/Spinner/Spinner';
import Menu from '../Menu/Menu'


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
        errorMessage: null
    }
    componentWillReceiveProps() {
        var blackList = ['/login', '/menu', '/notifications']
        if (blackList.indexOf(this.props.history.location.pathname) < 0) {
            this.loadProfile()
        }
    }
    componentDidMount() {
        var blackList = ['/login', '/menu', '/notifications']
        if (blackList.indexOf(this.props.history.location.pathname) < 0) {
            this.loadProfile()
        }
    }
    loadProfile = () => {
        this.setState({ loading: true })
        axios.get('https://skymail-920ab.firebaseio.com/users.json')
            .then(res => {
                this.setState({ loading: false })
                var userExist = false;
                var kv = document.cookie.split(';');
                var cookies = {}
                for (var id in kv) {
                    var cookie = kv[id].split('=');
                    cookies[cookie[0].trim()] = cookie[1]
                }
                for (let keys in res.data) {
                    // fetch your userData
                    if (res.data[keys] === res.data[cookies.userId]) {
                        const userdata = {
                            ...res.data[keys]
                        }
                        this.setState({
                            userData: userdata
                        })
                    }
                    // fetch the profile data
                    if (this.props.match.params.profile === res.data[keys].username) {
                        const profiledata = {
                            ...this.state.profileData
                        }
                        for (let key in res.data[keys]) {
                            profiledata[key] = res.data[keys][key]
                        }
                        this.setState({
                            profileData: profiledata
                        })
                        userExist = true
                    }
                }
                if (!userExist) {
                    this.setState({
                        errorMessage: "User not found"
                    })
                } else {
                    this.setState({
                        errorMessage: null
                    })
                }
                // gething friends data
                let fData = []
                this.state.profileData.friendsId.forEach(cur => {
                    for (let keys in res.data) {
                        if (keys === cur) {
                            fData.push(res.data[keys])
                            const profiledata = { ...this.state.profileData }
                            profiledata.friendsData = fData
                            this.setState({
                                profileData: profiledata
                            })
                        }
                    }
                });

                if (this.props.match.params.profile === this.state.userData.username) {
                    this.setState({
                        isUser: true
                    })
                } else {
                    this.setState({
                        isUser: false
                    })
                }
            })
            .catch(res => {
                this.setState(
                    {
                        loading: false,
                        errorMessage: <span><strong>Network Error </strong> Couldn't connect to database </span>,
                    })

            })

    }

    render() {

        return (
            <div className={classes.Profile}>
                <Toolbar profile={this.state.profileData.username} />
                {this.state.errorMessage ? <Alert type="danger" show={true}>{this.state.errorMessage}</Alert> : ''}
                {this.state.loading ?
                    <Spinner /> :
                    ''
                }
                <Switch>
                    <Route path='/menu' exact render={() => (<Menu />)} />
                    <Route path='/:profile' exact render={() => (<Timeline  {...this.state} />)} />
                </Switch>
            </div>
        )
    }
}

export default Profile

