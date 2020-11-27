import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import './Forms.css'

class RegisterView extends Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            securityAnswer1: "",
            securityAnswer2: "",
            errors: {
                cognito: null,
                passwordMatch: true,
            }
        }
    }

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
                passwordMatch: true,
            }
        })
    }

    validatePasswords() {
        return (this.state.password === this.state.confirmPassword);
    }

    handleSubmit = async event => {
        console.log("handle submit start");

        this.clearErrorState();
        this.setState({
            errors: {
                ...this.state.errors,
                passwordMatch: this.validatePasswords(),
            },
        });

        if (this.state.errors.passwordMatch) {
            const {email, password, firstName, lastName, securityAnswer1, securityAnswer2} = this.state;
            console.log(email);
            console.log(password);
            try {
                const signUpResponse = await Auth.signUp({
                    username: email,
                    password: password,
                    attributes: {
                        given_name: firstName,
                        family_name: lastName,
                        email: email,
                        "custom:SecurityQuestion1": securityAnswer1,
                        "custom:SecurityQuestion2": securityAnswer2,
                    }
                });

                console.log("resp: " + signUpResponse);
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
            console.log("3");
        } else {
            console.log("it broke");
        }

        console.log("handle submit end");
    }

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div className="forms">
                <h1>Register</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="firstName" onChange={this.onInputChange}>
                        <Form.Label>What is your first name?</Form.Label>
                        <Form.Control type="text" placeholder="First name" required/>
                    </Form.Group>

                    <Form.Group controlId="lastName" onChange={this.onInputChange}>
                        <Form.Label>What is your last name?</Form.Label>
                        <Form.Control type="text" placeholder="Last name" required/>
                    </Form.Group>

                    <Form.Group controlId="email" onChange={this.onInputChange}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group controlId="password" onChange={this.onInputChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required/>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" onChange={this.onInputChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" required/>
                    </Form.Group>
                    <Alert show={!this.state.errors.passwordMatch} variant="danger">
                        <p>Error: passwords do not match.</p>
                    </Alert>

                    <Form.Group controlId="securityAnswer1" onChange={this.onInputChange}>
                        <Form.Label>Security Question 1</Form.Label>
                        <Form.Control type="text" placeholder="What is your mother's maidenname?" required/>
                    </Form.Group>

                    <Form.Group controlId="securityAnswer2" onChange={this.onInputChange}>
                        <Form.Label>Security Question 2</Form.Label>
                        <Form.Control type="text" placeholder="What is your bestfriend's name?" required/>
                    </Form.Group>

                    <Button variant="primary" type="submit">Register</Button>
                </Form>
            </div>
        );
    }
}

export default RegisterView;