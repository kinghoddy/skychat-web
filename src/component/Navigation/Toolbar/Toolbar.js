import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';

const toolbar = props => {
    return (
        <nav className={classes.Toolbar + " navbar navbar-expand navbar-light fixed-top "}>
            <div className="container-fluid h-100">
                <Link to="/" className="navbar-brand p-0 h-100">
                    <Logo type='l6' />
                </Link>
                <h4>{props.title}</h4>
                <div className="navbar-collapse collapse">
                    <ul className={"text-capitalize navbar-nav ml-auto "}>
                        <li className="nav-item">
                            <Link className="nav-link js-scroll-trigger" to='/notification'><i className='material-icons'>notifications</i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link js-scroll-trigger" to='/messages'>messages</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link js-scroll-trigger" to='/login'>Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default toolbar