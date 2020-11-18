import React from 'react';
import Listing from './Listing'

class ListingTable extends React.Component {
    render() {
        let listings = [];
        this.props.listings.forEach(
            element => listings.push(<Listing
                                            key={element.stockItemId} // TODO: change this to product id
                                            name={element.stockItemId} 
                                            description={element.stockItemId}
                                            price={element.pricePer}
                                            amount={element.amount}
                                            isConsumer={this.props.isConsumer}
                                            isEditMode={this.props.isEditMode}
                                            updateStock={this.props.updateStock}
                                    />));

        return (
            <div>
                {listings}
            </div>
        );
    }
}

export default ListingTable;