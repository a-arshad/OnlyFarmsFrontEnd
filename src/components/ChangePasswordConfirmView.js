import React, { Component } from "react";
import { NavLink } from "react-router-dom";

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
