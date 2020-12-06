import "./App.css";
import React, { Component } from "react";
import { Route, HashRouter} from "react-router-dom";
import Header from "./components/Header";
import WelcomeView from './components/WelcomeView';
import DirectoryView from './components/DirectoryView';
import ConsumerView from "./components/ConsumerView";
import StoreView from "./components/StoreView";
import RegisterView from "./components/RegisterView";
import RegisterSuccessView from "./components/RegisterSuccessView";
import LoginView from "./components/LoginView";
import SecurityView from "./components/SecurityView";
import ForgotPasswordView from "./components/ForgotPasswordView";
import { Auth } from "aws-amplify";
import ForgotPasswordVerificationView from "./components/ForgotPasswordVerificationView";
import ChangePasswordConfirmView from "./components/ChangePasswordConfirmView";

class App extends Component {
	constructor() {
		super();

		this.state = {
			isLoggedIn: false,
			isLoggingIn: true,
			user: null,
		};
	}

	setLoginStatus = (loggedIn) => {
		this.setState({ isLoggedIn: loggedIn });
	};

	setUser = (user) => {
		this.setState({ user: user });
	};

	async componentDidMount() {
		try {
			await Auth.currentSession();
			this.setLoginStatus(true);
			const user = await Auth.currentAuthenticatedUser();
			this.setUser(user);
		} catch (error) {
			console.log(error);
		}
		this.setState({ isLoggingIn: false });
	}

	render() {
		const loginProps = {
			isLoggedIn: this.state.isLoggedIn,
			user: this.state.user,
			setLoginStatus: this.setLoginStatus,
			setUser: this.setUser,
		};

		return (
			!this.state.isLoggingIn && (
				<div className="App">
					<HashRouter>
						<div className="content">
							<Header auth={loginProps} />
							<Route
								exact
								path="/dir"
								render={(props) => <DirectoryView {...props} auth={loginProps} />}
							/>
							<Route
								exact
								path="/"
								render={(props) => <WelcomeView {...props} auth={loginProps} />}
							/>
							<Route
								path="/consumer"
								render={(props) => (
									<ConsumerView {...props} auth={loginProps} />
								)}
							/>
							<Route
								path="/store"
								render={(props) => <StoreView {...props} auth={loginProps} />}
							/>
							<Route
								path="/register"
								render={(props) => (<RegisterView {...props} auth={loginProps} />)}
							/>
							<Route
								path="/registerSuccess"
								render={(props) => (<RegisterSuccessView {...props} auth={loginProps} />)}
							/>
							<Route
								path="/login"
								render={(props) => <LoginView {...props} auth={loginProps} />}
							/>
							<Route
								path="/security"
								render={(props) => (
									<SecurityView {...props} auth={loginProps} />
								)}
							/>
							<Route
								path="/forgotpassword"
								render={(props) => (
									<ForgotPasswordView {...props} auth={loginProps} />
								)}
							/>
							<Route
								path="/forgotpasswordverification"
								render={(props) => (
									<ForgotPasswordVerificationView {...props} auth={loginProps} />
								)}
							/>
							<Route
								path="/passwordconfirm"
								render={(props) => (
									<ChangePasswordConfirmView {...props} auth={loginProps} />
								)}
							/>
						</div>
					</HashRouter>
				</div>
			)
		);
	}
}

export default App;
