import React, { Component } from 'react'
import classes from './Profile.css';
import axios from 'axios';
import { Redirect, Switch, withRouter, Route } from 'react-router-dom'
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import Alert from '../../component/UI/Alert/Alert';
import Timeline from './Timeline/Timeline';
import Spinner from '../../component/UI/Spinner/Spinner'


class Profile extends Component {
    state = {
        userData: {
            username: this.props.match.params.profile,
        },
        profileData: {
            username: '',
            coverPhoto: '',
            dp: '',
            friendsId: ['fdfdf33', 'f4fef', '4f4ff4', 'wdrfrf'],
            friendsData: {}

        },

        isUser: false,
        loading: true,
        errorMessage: null
    }

    componentDidMount() {

        var kv = document.cookie.split(';');
        var cookies = {}
        for (var id in kv) {
            var cookie = kv[id].split('=');
            cookies[cookie[0].trim()] = cookie[1]
        }

        console.log(cookie);


        this.setState({ loading: true })
        axios.get('https://skymail-920ab.firebaseio.com/users.json')
            .then(res => {
                this.setState({ loading: false })
                const friendsData = []
                for (let keys in res.data) {
                    // check if this is your profile
                    if (res.data[keys] === res.data[cookies.userId]) {
                        const userdata = {
                            ...res.data[keys]
                        }
                        console.log(userdata);
                        this.setState({
                            userData: { ...userdata }
                        })
                        if (this.state.profileData.username === this.state.userData.username) {
                            this.setState({
                                isUser: true
                            })
                        } else {
                            this.setState({
                                isUser: false
                            })
                        }

                    }
                    // fetch the profile data
                    if (res.data[keys].username === this.props.match.params.profile) {
                        const profiledata = {
                            ...res.data[keys]
                        }
                        profiledata.friendsId = ['swss', 'efef', 'vfvf', 'rvre', 'wec']
                        console.log(profiledata);
                        this.setState({
                            profileData: profiledata
                        })

                    }
                    // gething friends data
                    this.state.profileData.friendsId.forEach(cur => {
                        if (res.data[keys] === cur) {
                            friendsData.push(res.data[keys])
                        }
                    });
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
                {this.state.loading ? <div className="bg-light d-flex align-items-center h-100"><Spinner /></div> : <Route path='/:profile/timeline' render={() => (<Timeline {...this.state} />)} />}
                <Switch>
                    <Redirect from="/:profile/" exact to={"/:profile/timeline"} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Profile)

