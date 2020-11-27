import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";
import FormErrors from "../components/FormErrors";
import Validate from "../components/FormValidation";
import userEvent from "@testing-library/user-event";

class ChangePasswordConfirmView extends Component {
	render() {
		return (
			<section className="section auth">
				<div className="forms">
					<h1>Change Password</h1>
					<p>Your password has been successfully updated! 😊</p>
					<NavLink to="/">Return to home</NavLink>
				</div>
			</section>
		);
	}
}

export default ChangePasswordConfirmView;
