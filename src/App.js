import './App.css';
import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Header from './components/Header'
import HomeView from './components/HomeView';
import ConsumerView from './components/ConsumerView';
import StoreView from './components/StoreView';
import RegisterView from './components/RegisterView';
import LoginView from './components/LoginView';
import SecurityView from './components/SecurityView';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      isLoggedIn: false,
      user: null,
    }
  }

  setLoginStatus = loggedIn => {
    this.setState({ isLoggedIn: loggedIn });
  }

  setUser = user => {
    this.setState({ user: user })
  }

  render() {
    const loginProps = {
      isLoggedIn: this.state.isLoggedIn,
      user: this.state.user,
      setLoginStatus: this.setLoginStatus,
      setUser: this.setUser,
    }
    return (
      <HashRouter>
        <div className="App">
          <div className="content">
            <Header auth={loginProps} />
            <Route exact path="/" render={(props) => <HomeView {...props} auth={loginProps} /> } />
            <Route path="/consumer" render={(props) => <ConsumerView {...props} auth={loginProps} /> } />
            <Route path="/store" render={(props) => <StoreView {...props} auth={loginProps} /> } />
            <Route path="/register" render={(props) => <RegisterView {...props} auth={loginProps} /> } />
            <Route path="/login" render={(props) => <LoginView {...props} auth={loginProps} /> } />
            <Route path="/security" render={(props) => <SecurityView {...props} auth={loginProps} /> } />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
