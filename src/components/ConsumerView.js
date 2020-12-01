import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ListingTable from './ListingTable';
import { INVENTORY_MS, CART_MS } from '../constants/url';

class ConsumerView extends Component {
    constructor() {
        super();
        this.state = {
            storeId: 1,
            storeName: "Loading...",
            listings: [
                {
                  "inventoryId": 1,
                  "amount": 0,
                  "price": 0,
                  "priceUnit": "Loading...",
                  "productDesc": "Loading...",
                  "productName": "Loading...",
                  "storeId": 1
                }],
            cart: []
        };
    }

    updateCart(inventoryId, amount, userId, orderId, productName) {
        console.log("Moving item from inventory to cart " + userId);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "inventoryId": inventoryId,
            "orderId": orderId,
            "userId": userId.toString(),
            "amount": amount,
            "productName": productName
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // make API call with parameters and use promises to get response
        fetch(CART_MS + "/additem", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result));
                this.getListings(this.state.storeId);
                this.getUsersCart(userId);
            })
            .catch(error => console.log('error', error));
    }

    getUsersCart(userId) {
        console.log("Getting user " + userId + "'s carts");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "userId": userId.toString()
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // make API call with parameters and use promises to get response
        fetch(CART_MS + "/allcart", requestOptions)
            .then(response => response.text())
            .then(result => {
                var cart = JSON.parse(result)[0]; //show all user's cart
                this.setState({cart: cart}, () => console.log(this.state.cart));
            })
            .catch(error => console.log('error', error));
    }

    addToCart(inventoryId, productName, quantity) {
        this.updateCart(inventoryId, quantity, 1, 1, productName);
    }

    removeFromCart(cartItemId, inventoryId, amount) {
        console.log("removing item from cart");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "cartItemId": cartItemId,
            "inventoryId": inventoryId,
            "amount": amount
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        fetch(CART_MS + "/removeitem", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result));
                this.getListings(1);
                this.getUsersCart(1);
            })
            .catch(error => console.log('error', error));
        
    }

    getListings(storeId) {
        console.log("getting store inventory...");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "storeId": storeId.toString()
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // make API call with parameters and use promises to get response
        fetch(INVENTORY_MS + "/inventory", requestOptions)
            .then(response => response.text())
            .then(result => {
                var listings = JSON.parse(result)[0];
                console.log(listings);
                this.setState({listings: listings});
            })
            .catch(error => console.log('error', error));
    }

    checkout(userId) {
        console.log("checking out items");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "userId": userId.toString()
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch(CART_MS + "/checkout", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result));
                this.getListings(this.state.storeId);
                this.getUsersCart(1);
            })
            .catch(error => console.log("error", error));
    }
    
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const storeId = params.get("storeId");
        const storeName = params.get("storeName");        
        this.setState({ storeId: storeId, storeName: storeName });
        this.getListings(storeId);
        this.getUsersCart(1);
    }

    render() {
        var cartItems = [];
        console.log(this.state.cart);
        this.state.cart.forEach(element => cartItems.push(<h6 key={element.cartItemId}>{element.productName}: {element.amount}&nbsp;
            <button onClick={() => this.removeFromCart(element.cartItemId, element.inventoryId, element.amount)}>Remove from cart</button></h6>));
        console.log(cartItems);
        return (
            <div>
                <h1>{this.state.storeName}</h1>
                <ListingTable isConsumer={true} listings={this.state.listings} addToCart={this.addToCart.bind(this)}/>
                <Button onClick={() => this.checkout(1)}>Checkout</Button>
                <div><h4>Cart:</h4> {cartItems}</div>
            </div>
        );
    }
}

export default ConsumerView;