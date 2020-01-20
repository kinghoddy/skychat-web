import React, { Component } from 'react'
import classes from './Profile.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';


class Home extends Component {
    state = {
        username : this.props.match.params.profile,
        isUser : false
    }

    componentDidMount(){
        var kv = document.cookie.split(';');
        var cookies = {}
        for (var id in kv){
            var cookie = kv[id].split('=');
            cookies[cookie[0].trim()] = cookie[1]
        }
        
        if(cookies.username === this.state.username){
            this.setState({isUser : true})
        }        
    }

    render() {
        var name = null
        if(this.state.isUser){
            name = 'You: '+ this.state.username
        }else{
            name = this.state.username
        }
        return (
            <div className={classes.Profile}>
                <Toolbar />
                <h1>{name}</h1>
            </div>
        )
    }
}

export default Home

