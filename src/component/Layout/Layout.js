import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import { Route } from 'react-router-dom';

import classes from './Layout.css'


class Layout extends Component {
    render() {
        var toolbar = null;
        console.log(this.props);

        // if()
        return (
            <div className={classes.Layout}>
                <Route path="/home" component={Toolbar} />
                <Route path="/messages" render={() => (
                    <Toolbar title="Messages" />
                )} />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout