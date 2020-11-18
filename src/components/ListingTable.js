import React from 'react';
import Listing from './Listing'

class ListingTable extends React.Component {
    render() {
        let listings = [];
        this.props.listings.forEach(
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