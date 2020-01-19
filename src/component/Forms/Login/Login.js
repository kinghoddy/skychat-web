import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import classes from './Login.css';
import Input from '../../UI/Input/Input'
import Axios from 'axios';




class Login extends Component {
    state = {
        form: {
            username: {
                elementType: 'input',
                elementConfig: {
                    autoFocus: true,
                    type: 'text',
                    placeholder: 'Username',
                    required: true
                },
                value: '',
                id: "usernme",
                label: 'Username',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    required: true,
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                label: 'Your password',
                id: "password"
            },
            checkbox: {
                elementType: 'checkbox',
                label: "Remember my password",
                id: "checkbox",

            }
        }
    }
    inputChanged = (e, id) => {
        const updatedForm = {
            ...this.state.form
        }
        const updatedFormEl = { ...updatedForm[id] }
        updatedFormEl.value = e.target.value;
        updatedForm[id] = updatedFormEl
        this.setState({ form: updatedForm })
    }

    googleLogin = ()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result)=> {
          var user = result.user;
          console.log( user);
          
          const updatedForm = {
              ...this.state.form
          }
          updatedForm.username.value = user.displayName
          updatedForm.password.value = user.uid
          this.setState({ form: updatedForm })
        }).catch(function(error) {
          var errorMessage = error.message;
          console.log(errorMessage, 'error');
        });
              
          }
          
    
    loginHandler = event => {
        
        event.preventDefault();
        const formData = {};
        for (let formId in this.state.form) {
            formData[formId] = this.state.form[formId].value
        }
        axios.get('https://skymail-920ab.firebaseio.com/users.json')
        .then(res=>{
            console.log(res);
               
            document.cookie='username='+formData.username ;
            document.cookie= 'passwords='+ formData.password ;
            var expire = new Date(Date.now() + 60*1000).toString()

            this.props.history.push(formData.username)
        }).catch(res=>{
            console.log(res);
        })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.form) {
            formElementArray.push({
                id: key,
                config: this.state.form[key]
            })
        }
        return (
            <form onSubmit={this.loginHandler}>
                {formElementArray.map(el => (
                    <Input elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        id={el.id}
                        key={el.config.id}
                        label={el.config.label}
                        changed={(e) => { this.inputChanged(e, el.id) }} />
                ))}

                <button className={classes.btnLogin + " btn btn-lg btn-block  text-uppercase font-weight-bold mb-2"} type="submit">Sign in</button>
                <button className={classes.btnLogin + " btn btn-lg btn-block  text-uppercase font-weight-bold mb-2"} type="button" onClick={this.googleLogin} >Sign in with google</button>
                <div className="text-center">
                    <Link className="small" to="./home">Forgot password?</Link> <br />
                    <Link className="small" to="/SignUp">Create new account</Link></div>
            </form>

        )
    }
}

export default Login