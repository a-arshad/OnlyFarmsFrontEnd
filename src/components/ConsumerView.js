import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ListingTable from './ListingTable';
import { HOST, STOCK_ENDPOINT } from '../constants/url';

class ConsumerView extends Component {
    constructor() {
        super();
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let fetched_quantities = fetch(proxyurl + HOST + STOCK_ENDPOINT)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(
                e => {
                    console.log(e);
                    return e;
                }
            );
        console.log(fetched_quantities);
        this.state = {
            listings: [
                {name: 'Apple', description: 'YUM', price: '69', quantity: '5'},
                {name: 'Banana', description: 'YUMMY', price: '5', quantity: '6'},
                {name: 'Carrot', description: 'YumChampion', price: '2', quantity: '7'}
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>This is your Consumer!</h1>
                <NavLink exact to="/" style={{paddingRight: 20}}>Home</NavLink>
                <NavLink to="/store">StoreView</NavLink>
                <ListingTable isConsumer={true} listings={this.state.listings}/>
                <Button onClick={() => alert("Checkout clicked")}>Checkout</Button>
            </div>
        );
    }
}

export default ConsumerView;
