import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./Forms.css";

class LoginView extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			securityAnswer1: "",
			securityAnswer2: "",
			errors: {
				cognito: null,
				awsResponseError: false,
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
				awsResponseError: false,
			},
		});
	};

	handleSubmit = async (event) => {
		this.props.history.replace({
			search: "",
		});
		this.clearErrorState();
		try {
			Auth.configure({
				authenticationFlowType: "CUSTOM_AUTH",
			});
			console.log("Authenticating...")
			Auth.signIn(this.state.email, this.state.password)
				.then((user) => {
					if (user.challengeName === "CUSTOM_CHALLENGE") {
						// to send the answer of the custom challenge
						this.props.history.push({
							pathname: "/security",
							state: { user: user },
						});
					} else {
						console.log(user);
					}
				})
				.catch((err) => {
					console.log(err);
					this.setState({
						errors: {
							...this.state.errors,
							awsResponseError: true,
							awsResponseErrorMessage: err.message,
						},
					});
				});
		} catch (e) {
			console.log(e);
			let error = null;
			!e.message ? (error = { message: e }) : (error = e);
			this.setState({
				error: {
					...this.state.errors,
					cognito: error,
				},
			});
		}
	};

	onInputChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	};

	render() {
		return (
			<div className="forms">
				<h1>Login</h1>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="email">
						<Form.Control
							type="email"
							placeholder="Enter email"
							onChange={this.onInputChange}
							required
						/>
					</Form.Group>
					<Form.Group controlId="password" onChange={this.onInputChange}>
						<Form.Control type="password" placeholder="Password" required />
					</Form.Group>
					<Alert
						show={this.state.errors.awsResponseError === true}
						variant="danger"
					>
						<p>{this.state.errors.awsResponseErrorMessage}</p>
					</Alert>
					<Alert
						show={new URLSearchParams(this.props.location.search).get(
							"secwrong"
						)}
						variant="danger"
					>
						<p>
							You have answered your security question incorrect. <br></br>
							Please try again.
						</p>
					</Alert>
					<NavLink to="/forgotpassword">Forgot Password?</NavLink>
					<br />
					<br />
					<Button variant="primary" type="submit">
						Login
					</Button>
				</Form>
			</div>
		);
	}
}

export default LoginView;
