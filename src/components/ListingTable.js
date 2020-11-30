import React from 'react';
import Listing from './Listing'

class ListingTable extends React.Component {
    render() {
        let listings = [];
        this.props.listings.forEach(
            element => listings.push(<Listing
                                            key={element["inventoryId"]}
                                            id={element["inventoryId"]}
                                            name={element["productName"]} 
                                            description={element["productDesc"]}
                                            price={element["price"] + " " + element["priceUnit"]}
                                            amount={element["amount"]}
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