import React, { Component } from "react";
import classes from "./Timeline.css";
import { withRouter } from "react-router-dom";
import firebase from "../../../firebase";
import "firebase/auth";
import Spinner from "../../../component/UI/Spinner/Spinner";
import Friends from "../../../component/Friends/Friends";
import Alert from "../../../component/UI/Alert/Alert";
import Post from '../../../component/Posts/Posts';

class Timeline extends Component {
  state = {
    profileData: {
      username: "",
      coverPhoto: "",
      uid: null
    },

    isUser: false,
    loading: false,
    profile: "",
    errorMessage: null,
    modalMessage: null
  };

  componentDidMount() {
    this.load(this.props.profile);
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", "#fff");
  }

  componentDidUpdate() {
    if (this.props.match.params.profile !== this.state.profile) {
      this.setState({ profile: this.props.match.params.profile });
      this.load(this.props.match.params.profile);
    }
  }

  load = uname => {
    this.setState({ loading: true });
    var ref = firebase.database().ref("users/");
    ref.on("value", s => {
      var userExist = false;
      if (uname) {
        document.title = uname + " | Skychat";

        var username = uname.toLowerCase();
        for (let keys in s.val()) {
          // fetch the profile data
          if (username === s.val()[keys].username) {
            userExist = true;
            const profiledata = {
              ...this.state.profileData
            };
            for (let key in s.val()[keys]) {
              profiledata[key] = s.val()[keys][key];
            }
            profiledata.uid = keys;

            this.setState({
              profileData: profiledata
            });
          }
        }
        if (!userExist) {
          this.setState({
            errorMessage: (
              <span>
                User <strong className="text-capitalize">{username}</strong> not
                found
              </span>
            )
          });
        }
        if (username === this.props.userData.username) {
          this.setState({
            isUser: true
          });
        } else {
          this.setState({
            isUser: false
          });
        }
        this.setState({ loading: false });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.errorMessage ? (
          <Alert type="danger" show={true}>
            {this.state.errorMessage}{" "}
          </Alert>
        ) : null}
        <div className="container ">
          <div className="row ">
            <div className="col-lg-8 p-0 order-lg-2 px-lg-3">
              <div className="row no-gutters bg-white">
                <div className={classes.cover + " col "}>
                  <img src={this.state.profileData.coverPhoto} alt="" />
                  <div className={classes.dp}>
                    <img src={this.state.profileData.profilePicture} alt="" />
                  </div>
                  {this.state.loading ? (
                    <Spinner style={{ background: "#ccc" }} />
                  ) : (
                      <h3 className={classes.username}>
                        {!this.state.isUser ? (
                          this.state.profileData.username
                        ) : (
                            <span>
                              {this.state.profileData.username} <small>(You)</small>
                            </span>
                          )}
                      </h3>
                    )}
                </div>
              </div>
              <Friends uid={this.state.profileData.uid} />

              <Post
              />

            </div>

            <div className="col-lg-4 order-lg-1 bg-white ">
              <div className="row no-gutters">
                <div className={" col "}></div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Timeline);
