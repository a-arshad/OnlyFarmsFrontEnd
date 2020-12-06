import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./Banner.css"

class Banner extends Component {
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
        return(
            <div className="banner">
                {this.props.auth.isLoggedIn && this.props.auth.user ?
                <div className="buttons">
                    <Button 
                        variant="outline-light" 
                        style={{marginRight: "20px", marginBottom: 0}}
                        onClick={() => this.props.history.push("/store")}>
                        {this.props.auth.user.attributes.given_name}'s Store
                    </Button>
                    <Button 
                        variant="light" 
                        style={{marginRight: "20px", 
                        marginBottom: 0}}
                        onClick={this.handleLogOut}>
                        Logout
                    </Button>
                </div> :
                <div className="buttons">
                    <Button 
                        variant="outline-light" 
                        style={{marginRight: "20px", marginBottom: 0}}
                        onClick={() => this.props.history.push("/login")}>
                        Login
                    </Button>
                    <Button 
                        variant="light" 
                        style={{marginRight: "20px", 
                        marginBottom: 0}}
                        onClick={() => this.props.history.push("/register")}>
                        Register
                    </Button>
                </div>
                }
                <br/>
                <div className="text">
                    <p style={{fontSize: "100px", marginBottom: "0%"}}>OnlyFarms</p>
                    <p style={{fontSize: "25px", marginBottom: "0%"}}>Support sustainable farming</p>
                    <p style={{fontSize: "25px"}}>and reduce your carbon footprint.</p>
                </div>
            </div>
        );        
    }
}

export default withRouter(Banner);