import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ListingTable from './ListingTable'
import { INVENTORY_MS } from '../constants/url';

class StoreView extends Component {
    constructor() {
        super();
        this.state = {
            isEditMode: false,
            listings: [],
            oldListings: []
        };
    }

    componentDidMount() {
        console.log("getting store inventory...");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "storeId": "1"
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
                var l = JSON.parse(result)[0]
                this.setState({listings: l, oldListings:l});
            })
            .catch(error => console.log('error', error));
    }

    updateStock(stockItemId, newQuantity) {
        var i;
        var newListings = []
        for (i = 0; i < this.state.listings.length; i++) {
            var listing = JSON.parse(JSON.stringify(this.state.listings[i]));
            if (listing.inventoryId === stockItemId) {
                listing.amount = newQuantity;
            }
            newListings.push(listing);
        }
        this.setState({
            listings: newListings
        });
    }

    updateInventoryItem(listing) {
        console.log(listing);
        console.log("updating...");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "inventoryId": listing.inventoryId,
            "amount": listing.amount,
            "price": listing.price,
            "priceUnit": listing.priceUnit,
            "productDesc": listing.productDesc,
            "productName": listing.productName
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // make API call with parameters and use promises to get response
        fetch(INVENTORY_MS + "/updateinventory", requestOptions)
            .then(response => response.text())
            .then(result => {
                var l = JSON.parse(result)
                console.log(l);
            })
            .catch(error => console.log('error', error));
    }

    onConfirm() {
        console.log(this.state.listings);
        this.state.listings.forEach((listing) => this.updateInventoryItem(listing));

        this.setState({
            isEditMode: false,
            oldListings: this.state.listings
        });
    }

    onCancel() {
        this.setState({
            isEditMode: false,
            listings: this.state.oldListings
        });
    }

    render() {
        return (
            <div>
                <h1>This is your Store Page!</h1>
                <ListingTable isEditMode={this.state.isEditMode} listings={this.state.listings} updateStock={this.updateStock.bind(this)}/>
                {this.state.isEditMode ? 
                    <div>
                        <Button onClick={() => this.onCancel()} style={{marginRight: 20}}>Cancel</Button>
                        <Button onClick={() => this.onConfirm()}>Confirm</Button>
                    </div>
                    : <Button onClick={() => this.setState({isEditMode: true})}>Edit store</Button>}
            </div>
        );
    }
}

export default StoreView;
