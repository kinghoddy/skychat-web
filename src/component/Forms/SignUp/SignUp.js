import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '../../UI/Alert/Alert';

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import classes from './SignUp.css';
import Input from '../../UI/Input/Input'
import Picture from '../../../assets/Image/avatar.png';



class Signin extends Component {
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
            phone: {
                elementType: 'input',
                elementConfig: {
                    required: true,
                    type: 'tel',
                    placeholder: 'Phone number'
                },
                value: '+234',
                label: 'Phone number',
                id: "phone"
            }
        },
        errorMessage : null,
        image : Picture
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
      this.setState({errorMessage : null})
    var user = result.user;
    console.log( user);
    
    const updatedForm = {
        ...this.state.form
    }
    updatedForm.username.value = user.displayName
    updatedForm.password.value = user.uid
    this.setState({image : user.photoURL})

    this.setState({ form: updatedForm })
  }).catch((error)=> {
    var errorMessage = error.message;
    this.setState({errorMessage : errorMessage})
  });
        
    }
    
    signInHandler = event => {
        event.preventDefault();
        const formData = {};
        for (let formId in this.state.form) {
            formData[formId] = this.state.form[formId].value
        }
        formData.profilePicture = this.state.image
        axios.post('https://skymail-920ab.firebaseio.com/users.json', formData)
        .then(res=>{
            this.setState({errorMessage : null})
            document.cookie='username='+formData.username ;
            document.cookie= 'passwords='+ formData.password ;
            this.props.history.push(formData.username)
        }).catch(res=>{
            console.log(res);
            this.setState({errorMessage : <span><strong>Network Error</strong>Couldn't connect to database </span>})
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
            <form onSubmit={this.signInHandler}>
                {this.state.errorMessage? <Alert type="danger">{this.state.errorMessage}</Alert> : ''}
                {formElementArray.map(el => (
                    <Input elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        id={el.id}
                        key={el.config.id}
                        label={el.config.label}
                        changed={(e) => { this.inputChanged(e, el.id) }} />
                ))}

                <button className={classes.btnLogin + " btn btn-lg btn-block  text-uppercase font-weight-bold mb-2"} type="submit">Sign Up</button>
                <button className={classes.btnLogin + " btn btn-lg btn-block  text-uppercase font-weight-bold mb-2"} type="button" onClick={this.googleLogin} >Sign up with google</button>
                <div className="text-center">
                <Link className="small" to="/login">Already have an accout, Login</Link>
        </div>
            </form>

        )
    }
}

export default Signin