import React from 'react';
import classes from './User.css';

import Login from '../../component/Forms/Login/Login';
import Logo from '../../component/Logo/Logo';
const Account = props => {
    return (
        <div className={"container-fluid " + classes.Account}>
            <div className="row no-gutter">
                <div className={"text-white d-none d-md-flex col-md-4 col-lg-6 align-items-center " + classes.bgImage}>
                    <h1 className="mx-auto">The sky is the starting point</h1>
                </div>
                <div className="col-md-8 bg-white col-lg-6">
                    <div className={classes.login + " d-flex align-items-center py-5"} >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9   col-lg-8 mx-auto">
                                    <Logo type="l6" height='6rem' />
                                    <h3 className={classes.loginHeading + " mb-4"}>Welcome back!</h3>
                                    <Login />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}


export default Account