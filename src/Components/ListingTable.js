import React from 'react';
import Listing from './Listing.js'

class ListingTable extends React.Component {
    render() {
        return (
            <div>
                <Listing name={'apple'} description={"YUM"} price={'$69'} quantity={'5'}/>
                <Listing name={'banana'} description={"YUMMY"} price={'$5'} quantity={'6'}/>
                <Listing name={'carrot'} description={"YumChampion"} price={'$2'} quantity={'7'}/>
            </div>
        );
    }
}

export default ListingTable;