import React, { Component } from "react";
import classes from "./Messages.css";
import Chats from "../../component/Chats/Chats";
import { Route, Link } from "react-router-dom";
import Chatroom from "./Chatroom/Chatroom";

class Messages extends Component {
    state = {
        chatEl: null,
        chats: [{
            chatHead: 'My family',
            icon: "img",
            lastChat: 'You: this is a test chat',
            seen: false
        },
        {
            chatHead: 'SHIELD',
            icon: "img",
            lastChat: 'You: this is a test chat',
            seen: false
        }]
    }

    componentDidMount() {
        this.setState({
            chatEl: this.state.chats.map((cur, i) => (
                <Chats
                chatHead={cur.chatHead}
                    key={i}
                    lastChat={cur.lastChat}
                    seen={cur.seen}
                    icon={cur.icon} />
                    ))
        })
    }
    
    componentDidUpdate(){
        // console.log(this.props);
    }


    render() {

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
                         {this.props.location.pathname.replace(this.props.match.path + '/', '')}
                    </h4>
                )} />
                </nav>
                <Route path='/messages' exact render={() => (this.state.chatEl)} />
                <Route path='/messages/:chatHead' component={Chatroom} />
            </div>
        );
    }
}
export default Messages;
