import React from 'react';
import Listing from './Listing'

class ListingTable extends React.Component {
    constructor() {
        super();
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
            element => listings.push(<Listing name={element.name} 
                                            description={element.description}
                                            price={element.price}
                                            quantity={element.quantity}
                                            isConsumer={this.props.isConsumer}
                                    />));

        return (
            <div>
                {listings}
            </div>
        );
    }
}

export default ListingTable;