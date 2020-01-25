import React, { Component } from 'react'
import classes from './Home.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar'

class Home extends Component {

    render() {
        return (
            <div className={classes.home}>
                <Toolbar />
                <h1>Home</h1>
            </div>
        )
    }
}

export default Home

