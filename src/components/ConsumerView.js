import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ListingTable from './ListingTable';

class ConsumerView extends Component {
    render() {
        return (
            <div>
                <h1>This is your Consumer!</h1>
                <NavLink exact to="/" style={{paddingRight: 20}}>Home</NavLink>
                <NavLink to="/store">StoreView</NavLink>
                <ListingTable isConsumer={true}/>
                <Button onClick={() => alert("Checkout clicked")}>Checkout</Button>
            </div>
        );
    }
}

export default ConsumerView;
