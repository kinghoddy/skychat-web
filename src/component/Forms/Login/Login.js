import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import classes from "./Login.css";
import Input from "../../UI/Input/Input";
import Spinner from '../../UI/Spinner/Spinner'
import Alert from "../../UI/Alert/Alert";

class Login extends Component {
  state = {
    form: {
      username: {
        elementType: "input",
        elementConfig: {
          autoFocus: true,
          type: "text",
          placeholder: "Username",
          required: true
        },
        value: "",
        id: "usernme",
        label: "Username"
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
    loading: false,
    userExist: null
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
    this.setState({ loading: true })
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({ errorMessage: null, loading: false });
        var user = result.user;
        console.log(user);
        const updatedForm = {
          ...this.state.form
        };
        updatedForm.username.value = user.displayName;
        updatedForm.password.value = user.uid;
        this.setState({ form: updatedForm });

      })
      .catch(error => {
        var errorMessage = error.message;
        this.setState({
          errorMessage: (
            <span>
              <strong>Failed</strong>
              {errorMessage}
            </span>
          ),
          loading: false
        });
      });
  };

  componentDidMount() {

    console.log(this.state.userExist);
  }
  loginHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formId in this.state.form) {
      formData[formId] = this.state.form[formId].value;
    }

    this.setState({ loading: true })
    axios
      .get("https://skymail-920ab.firebaseio.com/users.json")
      .then(res => {
        this.setState({ errorMessage: null, loading: false });

        for (let keys in res.data) {
          if (
            res.data[keys].username === formData.username && res.data[keys].password === formData.password
          ) {
            document.cookie = "username=" + formData.username;
            document.cookie = "userId=" + keys;
            document.cookie = "passwords=" + formData.password;
            this.setState({
              userExist: formData.username
            })
            this.props.history.push(this.state.userExist);
          }
        }
        if (!this.state.userExist) {
          this.setState({
            errorMessage: (
              <span>
                <strong>User not found</strong> Make sure username and password
              are correct
                </span>
            ),
            loading: false
          })
        }
      })
      .catch(res => {
        this.setState({
          errorMessage: (
            <span>
              <strong>Error</strong> Failed to connect to server
            </span>
          ),
          loading: false
        });
        console.log(res);
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
    return (
      this.state.loading ? <Spinner /> : <form onSubmit={this.loginHandler}>
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
