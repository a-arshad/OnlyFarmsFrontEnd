import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";

class SecurityView extends Component {
	constructor() {
		super();
		this.state = {
			answer: "",
		};
	}

	checkUser(props) {
		return props.location.state && props.location.state.user.challengeParam
			? props.location.state.user.challengeParam.question
			: "";
	}

	handleSubmit = async (event) => {
		const user = this.props.location.state.user;
		Auth.sendCustomChallengeAnswer(user, this.state.answer)
			.then((user) => {
				console.log(user);
				this.props.auth.setLoginStatus(true);
				this.props.auth.setUser(user);
				this.props.history.push("/");
			})
			.catch((err) => {
				console.log(err);
				this.props.history.push("/login");
			});
	};

	onInputChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	};

	render() {
		return (
			<div className="forms">
				<h1>Security Question</h1>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="answer">
						<Form.Label>{this.checkUser(this.props)}</Form.Label>
						<Form.Control
							type="text"
							placeholder="Answer"
							onChange={this.onInputChange}
						/>
					</Form.Group>
					<br />
					<Button variant="primary" type="submit">
						Verify
					</Button>
				</Form>
			</div>
		);
	}
}

export default SecurityView;
