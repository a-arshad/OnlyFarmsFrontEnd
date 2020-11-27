import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";
import FormErrors from "../components/FormErrors";
import Validate from "../components/FormValidation";
import userEvent from "@testing-library/user-event";

class ForgotPasswordVerificationView extends Component {
	state = {
		verificationcode: "",
		email: "",
		newpassword: "",
		errors: {
			cognito: null,
			blankfield: false,
		},
	};

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
				blankfield: false,
			},
		});
	};

	passwordVerificationHandler = async (event) => {
		event.preventDefault();

		// Form validation
		this.clearErrorState();
		const error = Validate(event, this.state);
		if (error) {
			this.setState({
				errors: { ...this.state.errors, ...error },
			});
		}
		// AWS Cognito integration here

		try {
			await Auth.forgotPasswordSubmit(
				this.state.email,
				this.state.verificationcode,
				this.state.newpassword
			);
			this.props.history.push("/changepasswordconfirmation");
		} catch (error) {
			console.log(error);
		}
	};

	onInputChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value,
		});
		document.getElementById(event.target.id).classList.remove("is-danger");
	};

	render() {
		return (
			<section className="section auth">
				<div className="forms">
					<h1>Set new password</h1>
					<p>
						Please enter the verification code sent to your email address below,
						your email address and a new password.
					</p>
					<Form onSubmit={this.passwordVerificationHandler}>
						<Form.Group
							controlId="verificationcode"
							onChange={this.onInputChange}
						>
							<Form.Control placeholder="Enter verification code" />
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={this.onInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="newpassword" onChange={this.onInputChange}>
							<Form.Control type="password" placeholder="New password" />
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			</section>
		);
	}
}

export default ForgotPasswordVerificationView;
