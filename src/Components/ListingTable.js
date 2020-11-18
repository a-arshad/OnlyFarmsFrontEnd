import React from 'react';
import { HOST, STOCK_ENDPOINT } from '../constants/url';
import Listing from './Listing'

class ListingTable extends React.Component {
    constructor() {
        super();
        // TODO: Whenever the backend is ready the listings data should be retrieved from an endpoint
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let fetched_quantities = fetch(proxyurl + HOST + STOCK_ENDPOINT + "1")
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
        let listings = [];
        this.state.listings.forEach(
            element => listings.push(<Listing
                                            key={element.name} // TODO: change this to product id
                                            name={element.name} 
                                            description={element.description}
                                            price={element.price}
                                            quantity={element.quantity}
                                            isConsumer={this.props.isConsumer}
                                            isEditMode={this.props.isEditMode}
                                    />));

        return (
            <div>
                {listings}
            </div>
        );
    }
}

export default ListingTable;