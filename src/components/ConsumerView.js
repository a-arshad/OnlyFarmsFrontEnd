import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ListingTable from './ListingTable';
import { HOST, STOCK_ENDPOINT } from '../constants/url';

class ConsumerView extends Component {
    constructor() {
        super();
        const request = {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZIZENzMHhUbkYtQjgxWDhoUjhwNyJ9.eyJpc3MiOiJodHRwczovL2Rldi0taXpybi0xdC51cy5hdXRoMC5jb20vIiwic3ViIjoiQjdFRHcyMDdGSEZqSmtxckRSd0pHTk84YkhyNjUzYlhAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZmFybS1hcGkiLCJpYXQiOjE2MDU2NjgwNzEsImV4cCI6MTYwNTc1NDQ3MSwiYXpwIjoiQjdFRHcyMDdGSEZqSmtxckRSd0pHTk84YkhyNjUzYlgiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.j6XTMqugfl04e9f5d-yep9Y8Hl7PFjzx5lzhpelMrh0AD6u1NKqh-4OytAK_TxU2j1vpIIsQooWHy45yFsR5XqgP0pb9O2PbLEhwdDQ2uq50yUDl-xBzBUFIEvzawc1mrk7AyP884L25acyhPnVBkAwdzrqHTCiMRDlAQZ3JFgLa6_n6b8Wlcvk45aB2B2d-pF4clFknzzqCXg4V_6TjIAjRuDFbSJ7Wb-GEP7x0royQIXJiHrlSKI_AgEZmyj6ZEN3NDb4lYLktQzDUKLfrqNH1kl7Q9DBeeAQBxspcu2Q6KDgCERxrbf2Tg_0XzHOitDYyEie6mrOoTvgWspslGA"
            }
        }
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let fetched_quantities = fetch(HOST + STOCK_ENDPOINT + "1", request)
            .then(response => response.json())
            .then(data => console.log("output: " + data))
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
