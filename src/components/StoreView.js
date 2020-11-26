import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ListingTable from './ListingTable'
import { HOST_PREFIX, HOST, STOCK_ENDPOINT } from '../constants/url';

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
        console.log("suffer")
        fetch(HOST_PREFIX + HOST + STOCK_ENDPOINT)
            .then(response => response.json())
            .then(data => this.setState({
                listings: data.stocks,
                oldListings: data.stocks
            }))
            .catch(
                e => {
                    console.log(e);
                    return e;
                }
            );
    }

    updateStock(stockItemId, newQuantity) {
        var i;
        var newListings = []
        for (i = 0; i < this.state.listings.length; i++) {
            var listing = JSON.parse(JSON.stringify(this.state.listings[i]));

            if (listing.stockItemId === stockItemId) {

                listing.amount = newQuantity;
            }
            newListings.push(listing);
        }
        this.setState({
            listings: newListings
        });
    }

    onConfirm() {
        this.state.listings.forEach((listing) =>
            fetch(HOST_PREFIX + HOST + STOCK_ENDPOINT + listing.stockItemId, 
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(listing)
                })
                .then((response) => console.log(response))
                .catch(
                    e => {
                        console.log(e);
                        return e;
                    }
                ));
        this.setState({
            isEditMode: false,
            oldListings: this.state.listings
        });
    }

    onCancel() {
        console.log("listings: " + this.state.listings);
        console.log("oldlistings: " + this.state.oldListings);
        this.setState({
            isEditMode: false,
            listings: this.state.oldListings
        });
    }

    render() {
        console.log("render")
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
