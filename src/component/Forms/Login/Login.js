import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import classes from './Login.css';
import Input from '../../UI/Input/Input'




class Login extends Component {
    state = {
        form: {
            email: {
                elementType: 'input',
                elementConfig: {
                    autoFocus: true,
                    type: 'email',
                    placeholder: 'Email address',
                    required: true
                },
                value: '',
                id: "email",
                label: 'Email address',
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

    loginHandler = event => {
        event.preventDefault();
        const formData = {};
        for (let formId in this.state.form) {
            formData[formId] = this.state.form[formId].value
        }
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
                <div className="text-center">
                    <Link className="small" to="./home">Forgot password?</Link></div>
            </form>

        )
    }
}

export default Login