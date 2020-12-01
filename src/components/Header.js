import React, { Component } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";

class Header extends Component {
	handleLogOut = async (event) => {
		try {
			Auth.signOut();
			this.props.auth.setLoginStatus(false);
			this.props.auth.setUser(null);
		} catch (e) {
			console.log(e.message);
		}
	};

	render() {
		return (
			<Navbar bg="light">
				<Navbar.Collapse id="navbar">
					<Nav className="mr-auto">
						<NavLink exact to="/" style={{ paddingRight: 20 }}>
							Home
						</NavLink>
						{this.props.auth.isLoggedIn && this.props.auth.user && 
							<NavLink to="/store" style={{ paddingRight: 20 }}>
								StoreView
							</NavLink>
						}
					</Nav>
					<Nav>
						{this.props.auth.isLoggedIn && this.props.auth.user ? (
							<div style={{ display: "inline-block" }}>
								<p style={{ paddingRight: 20, display: "inline-block" }}>
									Hello, {this.props.auth.user.attributes.given_name}
								</p>
								<Button onClick={this.handleLogOut}>Logout</Button>
							</div>
						) : (
							<div>
								<NavLink to="/register" style={{ paddingRight: 20 }}>
									Register
								</NavLink>
								<NavLink to="/login">Login</NavLink>
							</div>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;
