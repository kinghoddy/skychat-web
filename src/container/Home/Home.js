import React, { Component } from "react";
import classes from "./Home.css";
import Logo from '../../component/Logo/Logo';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import 'firebase/auth';
import demo2 from '../../assets/Image/demo/demo2.png'

class Home extends Component {
  state = {
    userData: null
  }
  componentDidMount() {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", "#f7f7f7");
    document.title = "Skychat homepage";
    this.checkUser()
  }

  checkUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userdata = {
          username: user.displayName,
          profilePicture: user.photoURL
        }
        this.setState({ userData: userdata })
        this.props.history.push('/feed')
      }
    })
  }

  render() {
    return (
      <div className={classes.home} id="page-top">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
              <Logo type="l1" width="10rem" />
            </a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">

              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" to="/SignUp">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" to="/Login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" to="#contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className={classes.masthead}>
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-lg-7 my-auto">
                {this.state.userData ? <div className=" py-4 mx-auto d-flex text-light align-items-center justify-content-center">
                  <img style={{ height: "5rem", flexShrink: 0, width: "5rem", objectFit: "cover" }} src={this.state.userData.profilePicture} className="bg-light rounded-circle " alt="" />
                  <div className="text-light px-3 ">

                    <h4 className="text-light h6">{this.state.userData.username} is already logged in</h4>
                    <Link to={"/" + this.state.userData.username} className="btn btn-outline-light px-3 btn-sm  rounded-pill">Continue as {this.state.userData.username}</Link>
                  </div>
                </div>
                  : null}
                <div className={classes.header_content + " mx-auto"}>
                  <h1 className="mb-5">Welcome to skychat, the next social media hit !! . Stay connected with friends  24 / 7 </h1>
                  <Link style={{ fontSize: "1.5rem" }} to="/SignUp" className="btn btn-outline-light px-5  rounded-pill">Get started</Link>
                </div>
              </div>
              <div className="col-lg-5 my-auto">
                <div className={classes.device_container}>
                  <div className="device-mockup iphone6_plus portrait">
                    <div className="device">
                      <div className="screen">

                        <img src={demo2} className="img-fluid" alt="" />
                      </div>
                      <div className="button">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>


      </div>
    );
  }
}

export default Home;
