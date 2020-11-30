import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Forms.css";

const PASSWORD_REGEX = new RegExp(
	"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$*.{}?\"!@#%&/,><':;|_~`^\\]\\[\\)\\(]).{6,}"
);

class RegisterView extends Component {
	constructor() {
		super();
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
			},
		};
	}

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
				passwordMatch: true,
			},
		});
	};

	handleSubmit = async (event) => {
		console.log("handle submit start");

		this.clearErrorState();
		this.setState({
			errors: {
				...this.state.errors,
				passwordMatch: this.state.password === this.state.confirmPassword,
				passwordLong: this.state.password.length >= 8,
				passwordGoodChars: PASSWORD_REGEX.test(this.state.password),
			},
		});
		console.log(PASSWORD_REGEX.test(this.state.password));
		if (
			this.state.errors.passwordMatch &&
			this.state.errors.passwordLong &&
			this.state.errors.passwordGoodChars
		) {
			const {
				email,
				password,
				firstName,
				lastName,
				securityAnswer1,
				securityAnswer2,
			} = this.state;
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
					},
				});

				console.log("resp: " + signUpResponse);
				this.props.history.push({ pathname: "/registerSuccess" });
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
			console.log("3");
		} else {
			console.log("it broke");
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
				<h1>Register</h1>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="firstName" onChange={this.onInputChange}>
						<Form.Label>What is your first name?</Form.Label>
						<Form.Control type="text" placeholder="First name" required />
					</Form.Group>

					<Form.Group controlId="lastName" onChange={this.onInputChange}>
						<Form.Label>What is your last name?</Form.Label>
						<Form.Control type="text" placeholder="Last name" required />
					</Form.Group>

					<Form.Group controlId="email" onChange={this.onInputChange}>
						<Form.Label>Email Address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>

					<Form.Group controlId="password" onChange={this.onInputChange}>
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" required />
					</Form.Group>
					<small>
						Passwords must be at least of length 8 and contain: an uppercase, a
						lowercase, a special character and a number
					</small>

					<Form.Group controlId="confirmPassword" onChange={this.onInputChange}>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control type="password" placeholder="Password" required />
					</Form.Group>
					<Alert
						show={this.state.errors.passwordMatch === false}
						variant="danger"
					>
						<p>Error: Passwords do not match.</p>
					</Alert>
					<Alert
						show={this.state.errors.passwordLong === false}
						variant="danger"
					>
						<p>Error: Password length must be 8 or more characters.</p>
					</Alert>
					<Alert
						show={this.state.errors.passwordGoodChars === false}
						variant="danger"
					>
						<p>
							Error: Passwords needs to have at least 1 Uppercase, 1 Special,
							and 1 Numberic character
						</p>
					</Alert>

					<Form.Group controlId="securityAnswer1" onChange={this.onInputChange}>
						<Form.Label>Security Question 1</Form.Label>
						<Form.Control
							type="text"
							placeholder="What is your mother's maidenname?"
							required
						/>
					</Form.Group>

					<Form.Group controlId="securityAnswer2" onChange={this.onInputChange}>
						<Form.Label>Security Question 2</Form.Label>
						<Form.Control
							type="text"
							placeholder="What is your bestfriend's name?"
							required
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Register
					</Button>
				</Form>
			</div>
		);
	}
}

export default RegisterView;
