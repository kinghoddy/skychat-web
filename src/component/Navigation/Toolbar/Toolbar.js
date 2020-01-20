import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';

const toolbar = props => {


    return (
        <React.Fragment>

            <nav className={classes.Toolbar + " navbar navbar-expand navbar-light fixed-top "}>
                <div className="container-fluid h-100">
                    <Link to="/" className=" navbar-brand p-0 h-100">
                        <Logo type='l6' />

                    </Link>
                    <div className="navbar-collapse collapse">
                        <ul className={"text-capitalize navbar-nav ml-auto "}>
                            <Link className="ml-auto nav-link js-scroll-trigger" to={"/" + props.profile + '/messages'}>
                                <i className="material-icons">chats</i>
                            </Link>
                            <div className="d-none d-lg-inline-flex">
                                <li className="nav-item col-4 ">
                                    <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={"/" + props.profile + "/timeline"}>
                                        <i className='material-icons'>account_circle</i>
                                    </NavLink>
                                </li>
                                <li className="nav-item col-4">
                                    <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={'/' + props.profile + '/notification'}><i className='material-icons'>notifications</i>
                                    </NavLink>
                                </li>

                                <li className="nav-item col-4">
                                    <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={'/' + props.profile + '/menu'}>
                                        <i className='material-icons'>menu</i>
                                    </NavLink>
                                </li>
                            </div>

                        </ul>
                    </div>
                </div>
            </nav>
            <nav className={classes.Navbar + " fixed-bottom d-lg-none navbar navbar-expand navbar-light"}>
                <div className="container-fluid navbar-collapse collapse p-0">
                    <ul className=" navbar-nav w-100 text-center">
                        <li className="nav-item col-4 ">
                            <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={"/" + props.profile + "/timeline"}>
                                <i className='material-icons'>account_circle</i>
                            </NavLink>
                        </li>
                        <li className="nav-item col-4">
                            <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={'/' + props.profile + '/notification'}><i className='material-icons'>notifications</i>
                            </NavLink>
                        </li>

                        <li className="nav-item col-4">
                            <NavLink activeClassName={classes.active} className="nav-link js-scroll-trigger" to={'/' + props.profile + '/menu'}>
                                <i className='material-icons'>menu</i>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment >

    )
}

export default toolbar