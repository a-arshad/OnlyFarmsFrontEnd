import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
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
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
			},
		});
	};

	handleSubmit = async (event) => {
		console.log("handle submit start");
		this.clearErrorState();
		console.log("PAIN");
		try {
			Auth.configure({
				authenticationFlowType: "CUSTOM_AUTH",
			});
			console.log("HELLO");
			const user = Auth.signIn(this.state.email, this.state.password)
				.then((user) => {
					console.log("GG");
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
				.catch((err) => console.log(err));
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
		console.log("handle submit end");
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
						<Form.Control
							type="password"
							placeholder="Password"
							required
						/>
					</Form.Group>
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
