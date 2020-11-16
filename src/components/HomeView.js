import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HomeView extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to OnlyFarms</h1>
                <NavLink to="/consumer" style={{paddingRight: 20}}>ConsumerView</NavLink>
                <NavLink to="/store">StoreView</NavLink>
            </div>
        );
    }
}

export default HomeView;
