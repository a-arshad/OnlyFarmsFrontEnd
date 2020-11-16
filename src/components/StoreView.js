import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ListingTable from './ListingTable'

class StoreView extends Component {
    render() {
        return (
            <div>
                <h1>This is your Store!</h1>
                <NavLink exact to="/" style={{paddingRight: 20}}>Home</NavLink>
                <NavLink to="/consumer">ConsumerView</NavLink>
                <ListingTable />
                <Button onClick={() => alert("Edit store clicked")}>Edit store</Button>
            </div>
        );
    }
}

export default StoreView;
