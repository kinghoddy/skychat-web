import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import firebase from '../../../firebase';
import 'firebase/auth';

const toolbar = props => {
    var profile = props.profile

    var user = firebase.auth().currentUser

    if (!profile) {
        if (user) {
            profile = user.displayName
        }
    }

    window.addEventListener('scroll', () => {

    })

    return (
        <React.Fragment>

            <nav className={classes.Toolbar + " navbar navbar-expand navbar-light fixed-top "}>
                <div className="container-fluid h-100">
                    <Link to="/" className=" navbar-brand p-0 h-100">
                        <Logo type='l6' />

                    </Link>
                    <div className="navbar-collapse collapse">
                        <ul className={"text-capitalize navbar-nav ml-auto "}>
                            {user ? <Link className="ml-auto nav-link js-scroll-trigger" to={'/messages'}>
                                <i className="material-icons">chats</i>
                            </Link> : ''
                            }
                            <div className="d-none d-lg-inline-flex">
                                <li className="nav-item col-4 ">
                                    <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={"/" + profile}>
                                        <i className='material-icons'>account_circle</i>
                                    </NavLink>
                                </li>
                                {user ? <li className="nav-item col-4">
                                    <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={'/notification'}><i className='material-icons'>notifications</i>
                                    </NavLink>
                                </li> : ''}

                                {user ? <li className="nav-item col-4">
                                    <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={'/menu'}>
                                        <i className='material-icons'>menu</i>
                                    </NavLink>
                                </li> : ''
                                }

                            </div>
                            {user ? '' : <Link className="ml-auto  nav-link js-scroll-trigger" to={'/login'}>
                                <button style={{
                                    background: 'orangered',
                                    color: 'white'
                                }} className="btn rounded-pill">Log in</button>
                            </Link>}
                        </ul>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route path="/" exact />
                <Route render={() => (
                    <nav className={classes.Navbar + " fixed-bottom d-lg-none navbar navbar-expand navbar-light"}>
                        <div className="container-fluid navbar-collapse collapse p-0">
                            <ul className=" navbar-nav w-100 text-center">
                                <li className="nav-item col-4 ">
                                    <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={"/" + profile}>
                                        <i className='material-icons'>account_circle</i>
                                    </NavLink>
                                </li>
                                {profile ? <li className="nav-item col-4">
                                    <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={'/notifications'}><i className='material-icons'>notifications</i>
                                    </NavLink>
                                </li> : ''}

                                {profile ? <li className="nav-item col-4">
                                    <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={'/menu'}>
                                        <i className='material-icons'>menu</i>
                                    </NavLink>
                                </li> : ''}
                            </ul>
                        </div>
                    </nav>
                )} />
            </Switch>

        </React.Fragment >

    )
}

export default toolbar