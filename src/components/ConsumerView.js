import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ListingTable from './ListingTable';
import { INVENTORY_MS, CART_MS } from '../constants/url';

class ConsumerView extends Component {
    constructor() {
        super();
        this.state={
            listings: [],
            cart:[]
        }
        this.state = {
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
        // {
        //     "amount": "6", //needs to be less than the number of it in the inventory
        //     "inventoryId": "1", //needs to be a stockId
        //     "orderId": "5", //put as anything
        //     "userId": "1" 
        // }
        console.log("Moving item from inventory to cart");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "inventoryId": inventoryId,
            "orderId": orderId,
            "userId": userId,
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
                this.getListings(1);
                this.getUsersCart(1);
            })
            .catch(error => console.log('error', error));
    }

    getUsersCart(userId) {
        console.log("Getting users carts");
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
                var l = JSON.parse(result)[0]; //show all user's cart
                this.setState({cart: l}, () => console.log(this.state.cart));
            })
            .catch(error => console.log('error', error));
    }

    addToCart(inventoryId, productName, quantity) {
        console.log("test add item from inventory");
        for (let i=0; i < this.state.cart.length; i++) {
            if (this.state.cart[i].inventoryId === inventoryId) {
                console.log("updating existing cart item");
                this.updateCart(inventoryId, quantity, 1, 1, productName);
                return;
            }
        }
        console.log("new item being added to cart");
        this.updateCart(inventoryId, quantity, 1, 1, productName);
    }

    removeFromCart(productName) {
        var newCart = this.state.cart;
        for (let i=0; i < newCart.length; i++) {
            if (newCart[i].productName === productName) {
                console.log(newCart[i]);
                console.log(productName);
                newCart.splice(i, 1);
                this.setState({
                    cart: newCart
                })
            }
        }
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
                var l = JSON.parse(result)[0];
                this.setState({listings: l});
            })
            .catch(error => console.log('error', error));
    }
    
    componentDidMount() {
        this.getListings(1);
        this.getUsersCart(1);
    }

    render() {
        var cartItems = [];
        console.log(this.state.cart);
        this.state.cart.forEach(element => cartItems.push(<h6 key={element.cartItemId}>{element.productName}: {element.amount}&nbsp;
            <button onClick={() => this.removeFromCart(element.productName)}>Remove from cart</button></h6>));
        console.log(cartItems);
        return (
            <div>
                <h1>User {this.state.listings[0]["storeId"]}'s Store</h1>
                <ListingTable isConsumer={true} listings={this.state.listings} addToCart={this.addToCart.bind(this)}/>
                <Button onClick={() => alert("Checkout clicked")}>Checkout</Button>
                <div><h4>Cart:</h4> {cartItems}</div>
            </div>
        );
    }
}

export default ConsumerView;