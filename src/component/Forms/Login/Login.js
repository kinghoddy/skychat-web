import React, { Component } from "react";
import { Link } from "react-router-dom";

import "firebase/auth";
import "firebase/database";
import firebase from '../../../firebase';


import classes from "./Login.css";
import Input from "../../UI/Input/Input";
import Spinner from '../../UI/Spinner/Spinner'
import Alert from "../../UI/Alert/Alert";

class Login extends Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          autoFocus: true,
          type: "email",
          placeholder: "Email Address",
          required: true
        },
        value: "",
        id: 'email',
        label: "Email address"
      },
      password: {
        elementType: "input",
        elementConfig: {
          required: true,
          type: "password",
          placeholder: "Your password"
        },
        value: "",
        label: "Your password",
        id: "password"
      }
    },
    errorMessage: null,
    sMessage: 'Please Wait ! ! !',
    loading: false,
    userExist: null,
    shouldLogin: false
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
    this.setState({ loading: true, sMessage: 'Checking info' })

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({ errorMessage: null, loading: false });
        var user = result.user;
        console.log(user);
        this.fetchUser(user)
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(user);
      } else {
        // No user is signed in.
      }
    });

  }
  fetchUser = (user) => {
    var username
    if (user != null) {
      username = user.displayName;
      this.setState({ loading: false, errorMessage: null, shouldLogin: true })

    } else {
      var errorMessage = <strong>Failed</strong>
      this.setState({ loading: false, errorMessage: errorMessage })
    }
    if (this.state.shouldLogin) {
      var search = this.props.location.search
      if (search) {
        this.props.history.push('/' + search.substr(1));
      } else {
        this.props.history.push('/' + username);
      }
    }
  }

  signInHandler = event => {
    event.preventDefault();
    this.setState({ loading: true })
    const formData = {};
    for (let formId in this.state.form) {
      formData[formId] = this.state.form[formId].value
    }
    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then(res => {
        // User is signed in.
        var user = res.user
        this.fetchUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        var errorMessage = error.message;
        this.setState({ loading: false, errorMessage: errorMessage })
        // ...
      });
  }


  render() {
    const formElementArray = [];
    for (let key in this.state.form) {
      formElementArray.push({
        id: key,
        config: this.state.form[key]
      });
    }
    return (
      this.state.loading ? <Spinner message={this.state.sMessage} /> : <form onSubmit={this.signInHandler}>
        {this.state.errorMessage ? (
          <Alert type="warning" show={true}>
            {this.state.errorMessage}
          </Alert>
        ) : null}

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
        <button
          className={classes.googleBtn + " btn btn-lg btn-block mb-2"}
          type="button"
          onClick={this.googleLogin}>
          <i className="fab fa-google mr-3"></i>
          Log in in with google
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
