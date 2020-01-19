import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './Layout.css'


class Layout extends Component {

    render() {


        // if()
        return (
            <div className={classes.Layout}>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout