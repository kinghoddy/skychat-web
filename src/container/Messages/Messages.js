import React, { Component } from "react";
import classes from "./Messages.css";
import Chats from "../../component/Chats/Chats";
import { Route, Link } from "react-router-dom";
import Chatroom from "./Chatroom/Chatroom";

const Messages = props => {
        return (
            <div className={classes.Messages}>
                <nav className={classes.Navbar +" navbar navbar-expand fixed-top border-bottom bg-white navbar-light"}>
                    <Route path='/messages/:chathead' render={()=>(
                        <Link to="/messages" className="navbar-brand">
                        <i className={'fa fa-arrow-left'} ></i>
                   </Link>
                    )} />
                    <Link to="/" className="navbar-brand">
                        Recipient img
                   </Link>
                   <Route path='/messages' exact render={() => (
                     <h4 className="mb-0">
                         Chats
                    </h4>
                )} />
                <Route path='/messages/:chatHead' exact render={() => (
                     <h4 className="mb-0">
                         {props.location.pathname.replace(props.match.path + '/', '')}
                    </h4>
                )} />
                </nav>
                <Route path='/messages' exact component={Chats} />
                <Route path='/messages/:chatHead' component={Chatroom} />
            </div>
        );
    }
export default Messages;
