import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Auth } from "aws-amplify";

class ForgotPasswordVerificationView extends Component {
	state = {
		verificationCode: "",
		newPassword: "",
		confirmPassword: "",
		errors: {
			cognito: null,
			passwordMatch: true,
		},
	};

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
				passwordMatch: true,
			},
		});
	};

	validatePasswords() {
        return (this.state.newPassword === this.state.confirmPassword);
    }

	passwordVerificationHandler = async (event) => {
		event.preventDefault();

		this.clearErrorState();

		this.setState({
            errors: {
                ...this.state.errors,
                passwordMatch: this.validatePasswords(),
            },
		});
		
		if (this.state.errors.passwordMatch) {
			try {
				await Auth.forgotPasswordSubmit(
					this.props.location.state.email,
					this.state.verificationCode,
					this.state.newPassword
				);
				this.props.history.push("/passwordconfirm");
			} catch (error) {
				console.log(error);
			}
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
					<h1>Set new password</h1>
					<p>
						Please enter the verification code sent to your email address below,
						your email address and a new password.
					</p>
					<Form onSubmit={this.passwordVerificationHandler}>
						<Form.Group
							controlId="verificationCode"
							onChange={this.onInputChange}
							required
						>
							<Form.Control placeholder="Enter verification code" />
						</Form.Group>

						<Form.Group controlId="newPassword" onChange={this.onInputChange}>
                        	<Form.Label>Password</Form.Label>
							<Form.Control 
								type="password"
								placeholder="Password"
								required
							/>
                   		</Form.Group>
						<small>
							Passwords must be at least of length 8 and contain: 
							an uppercase, a lowercase, a special character and a number
						</small>

						<Form.Group controlId="confirmPassword" onChange={this.onInputChange}>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password" 
								required
							/>
						</Form.Group>
						<Alert show={this.state.errors.passwordMatch === false} variant="danger">
							<p>Error: passwords do not match.</p>
						</Alert>
						
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
