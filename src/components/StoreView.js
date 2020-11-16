import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class StoreView extends Component {
    render() {
        return (
            <div>
                <h1>This is your Store!</h1>
                <NavLink exact to="/" style={{paddingRight: 20}}>Home</NavLink>
                <NavLink to="/consumer">ConsumerView</NavLink>
            </div>
        );
    }
}

export default StoreView;
