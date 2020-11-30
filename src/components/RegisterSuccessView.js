import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class RegisterSuccessView extends Component {
	render() {
		return (
			<section className="section auth">
				<div className="forms">
					<h1>Registration Successful</h1>
					<p>Check your email for a link to verfy your account.</p>
					<NavLink to="/">Return to home</NavLink>
				</div>
			</section>
		);
	}
}

export default RegisterSuccessView;
