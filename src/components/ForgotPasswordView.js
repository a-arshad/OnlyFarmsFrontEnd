import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";

class ForgotPasswordView extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			errors: {
				cognito: null,
			},
		};
	}

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
			},
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		this.clearErrorState();

		try {
			await Auth.forgotPassword(this.state.email);
			this.props.history.push({
				pathname: "/forgotpasswordverification",
				state: { email: this.state.email },
			});
		} catch (error) {
			console.log(error);
		}
	};

	onInputChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	};

	render() {
		return (
			<section className="section auth">
				<div className="forms">
					<h1>Forgot your password?</h1>
					<p>
						Please enter the email address associated with your account and
						we'll email you a password reset link.
					</p>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="email">
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={this.onInputChange}
								required
							/>
						</Form.Group>
						<NavLink to="/login">Back to login</NavLink>
						<br />
						<br />
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			</section>
		);
	}
}

export default ForgotPasswordView;
