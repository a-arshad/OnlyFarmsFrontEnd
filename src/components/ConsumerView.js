import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ConsumerView extends Component {
    render() {
        return (
            <div>
                <h1>This is your Consumer!</h1>
                <NavLink exact to="/" style={{paddingRight: 20}}>Home</NavLink>
                <NavLink to="/store">StoreView</NavLink>
            </div>
        );
    }
}

export default ConsumerView;
