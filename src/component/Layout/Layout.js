import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import { Route } from 'react-router-dom';

import classes from './Layout.css'


class Layout extends Component {

    render() {


        // if()
        return (
            <div className={classes.Layout}>
                <Route path="/home" component={Toolbar} />
               
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout