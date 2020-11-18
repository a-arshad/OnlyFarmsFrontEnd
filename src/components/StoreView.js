import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ListingTable from './ListingTable'
import { HOST, STOCK_ENDPOINT } from '../constants/url';

class StoreView extends Component {
    constructor() {
        super();
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let fetched_quantities = fetch(proxyurl + HOST + STOCK_ENDPOINT + "1")
            .then(response => response.json())
            .then(data => console.log(data.amount))
            .catch(
                e => {
                    console.log(e);
                    return e;
                }
            );
        console.log(fetched_quantities['amount']);
        this.state = {
            isEditMode: false,
            listings: [
                {name: 'Apple', description: 'YUM', price: '69', quantity: fetched_quantities.amount},
                {name: 'Banana', description: 'YUMMY', price: '5', quantity: '6'},
                {name: 'Carrot', description: 'YumChampion', price: '2', quantity: '7'}
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>This is your Store!</h1>
                <NavLink exact to="/" style={{paddingRight: 20}}>Home</NavLink>
                <NavLink to="/consumer">ConsumerView</NavLink>
                <ListingTable isEditMode={this.state.isEditMode} listings={this.state.listings}/>
                {this.state.isEditMode ? 
                    <div>
                        <Button onClick={() => this.setState({isEditMode: false})} style={{marginRight: 20}}>Cancel</Button>
                        <Button onClick={() => this.setState({isEditMode: false})}>Confirm</Button>
                    </div>
                    : <Button onClick={() => this.setState({isEditMode: true})}>Edit store</Button>}
            </div>
        );
    }

}

export default StoreView;
