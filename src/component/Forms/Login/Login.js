import React, { Component } from "react";
import { Link } from "react-router-dom";

import "firebase/auth";
import "firebase/database";
import firebase from "../../../firebase";

import google from "../../../assets/Image/google.png";

import classes from "./Login.css";
import Input from "../../UI/Input/Input";
import Spinner from "../../UI/Spinner/Spinner";
import Toast from "../../UI/Toast/Toast";
import Alert from "../../UI/Alert/Alert";
import cover from "../../../assets/Image/avatar_square.png";

class Login extends Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
          required: true
        },
        value: "",
        id: "email",
        label: "Email address"
      },
      password: {
        elementType: "input",
        elementConfig: {
          required: true,
          type: "password",
          minLength: 6,
          placeholder: "Your password"
        },
        value: "",
        label: "Your password",
        id: "password"
      }
    },
    errorMessage: null,
    sMessage: "Please Wait ! ! !",
    loading: false,
    userExist: null,
    shouldLogin: false,
    toast: null
  };
  inputChanged = (e, id) => {
    const updatedForm = {
      ...this.state.form
    };
    const updatedFormEl = { ...updatedForm[id] };
    updatedFormEl.value = e.target.value;
    updatedForm[id] = updatedFormEl;
    this.setState({ form: updatedForm });
  };

  googleLogin = () => {
    this.setState({ loading: true, sMessage: "Checking info" });

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({ errorMessage: null, loading: false });
        var user = result.user;
        console.log(result);
        if (result.additionalUserInfo.isNewUser === true) {
          this.setState({ toast: "Finish setting up your skymail account" });
          this.saveUser(user);
        } else {
          this.fetchUser(user);
        }
      })
      .catch(error => {
        var errorMessage = error.message;
        this.setState({
          errorMessage: (
            <span>
              <strong>Failed </strong>
              {errorMessage}
            </span>
          ),
          loading: false
        });
      });
  };

  componentDidMount() {
    document.title = "Login | Skychat";
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  }
  fetchUser = user => {
    var username;
    if (user != null) {
      username = user.displayName;
      this.setState({ loading: false, errorMessage: null, shouldLogin: true });
    } else {
      var errorMessage = <strong>Failed</strong>;
      this.setState({ loading: false, errorMessage: errorMessage });
    }
    if (this.state.shouldLogin) {
      var search = this.props.location.search;
      if (search) {
        this.props.history.push("/" + search.substr(1));
      } else {
        this.props.history.push("/" + username);
      }
    }
  };

  saveUser = user => {
    var ref = firebase.database().ref("users/");
    const id = user.uid;

    this.setState({ loading: true, sMessage: "Completing Signup  !" });
    ref
      .child(id)
      .set({
        username: user.displayName.toLowerCase(),
        coverPhoto: cover,
        profilePicture: user.photoURL
      })
      .then(() => {
        this.setState({ loading: false, errorMessage: null });
        console.log("success");
        this.props.history.push(user.displayName.toLowerCase());
      })
      .catch(() => {
        this.setState({
          loading: false,
          errorMessage: "Failed to save user to database"
        });
      });
  };

  signInHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formId in this.state.form) {
      formData[formId] = this.state.form[formId].value;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(res => {
        // User is signed in.
        var user = res.user;
        this.fetchUser(user);
      })
      .catch(error => {
        // Handle Errors here.
        var errorMessage = error.message;
        this.setState({ loading: false, errorMessage: errorMessage });
        // ...
      });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.form) {
      formElementArray.push({
        id: key,
        config: this.state.form[key]
      });
    }
    return this.state.loading ? (
      <Spinner message={this.state.sMessage} />
    ) : (
      <form onSubmit={this.signInHandler}>
        {this.state.errorMessage ? (
          <Alert type="warning" show={true}>
            {this.state.errorMessage}
          </Alert>
        ) : null}
        {this.state.toast ? <Toast>{this.state.toast}</Toast> : null}

        {formElementArray.map(el => (
          <Input
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            id={el.id}
            key={el.config.id}
            label={el.config.label}
            changed={e => {
              this.inputChanged(e, el.id);
            }}
          />
        ))}

        <button
          className={
            classes.btnLogin +
            " btn btn-lg btn-block  text-uppercase font-weight-bold mb-2"
          }
          type="submit"
        >
          Sign in
        </button>
        <p className="text-center text-primary"> Or</p>
        <button
          className={classes.googleBtn + " btn btn-lg btn-block  mb-2"}
          type="button"
          onClick={this.googleLogin}
        >
          <img
            src={google}
            alt=" "
            style={{ width: "2rem" }}
            className="mr-4"
          />
          Sign up with google
        </button>
        <div className="text-center">
          <Link className="small" to="./home">
            Forgot password?
          </Link>{" "}
          <br />
          <Link className="small" to="/SignUp">
            Create new account
          </Link>
        </div>
      </form>
    );
  }
}

export default Login;
