import React from 'react';
import Listing from './Listing'

class ListingTable extends React.Component {
    render() {
        let listings = [];
        this.props.listings.forEach(
            element => listings.push(<Listing
                                            key={element["inventoryId (S)"]} // TODO: change this to product id
                                            id={element["inventoryId (S)"]}
                                            name={element["productName (S)"]} 
                                            description={element["productDesc (S)"]}
                                            price={element["price (N)"] + " " + element["priceUnit (S)"]}
                                            amount={element["amount (N)"]}
                                            isConsumer={this.props.isConsumer}
                                            isEditMode={this.props.isEditMode}
                                            updateStock={this.props.updateStock}
                                            addToCart={this.props.addToCart}
                                    />));

        return (
            <div>
                {listings}
            </div>
        );
    }
}

export default ListingTable;