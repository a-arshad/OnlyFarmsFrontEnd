import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './Forms.css'

class LoginView extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            securityAnswer1: "",
            securityAnswer2: "",
            errors: {
                cognito: null,
            }
        }
    }

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
            }
        })
    }

    handleSubmit = async event => {
        console.log("handle submit start");

        this.clearErrorState();

        try {
            const user = await Auth.signIn(this.state.email, this.state.password);
            console.log(user);
            this.props.auth.setLoginStatus(true);
            this.props.auth.setUser(user);
            this.props.history.push("/");
        } catch(e) {
            console.log(e);
            let error = null;
            !e.message ? error = { "message": e } : error = e;
            this.setState({
                error: {
                    ...this.state.errors,
                    cognito: error
                }
            });
        }

        console.log("handle submit end");
    }

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        // TODO: Add forgot password link
        return (
            <div className="forms">
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.onInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="password" onChange={this.onInputChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <NavLink to="/Login">Forgot Password?</NavLink>
                    <br/>
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
            </div>
        );
    }
}

export default LoginView;