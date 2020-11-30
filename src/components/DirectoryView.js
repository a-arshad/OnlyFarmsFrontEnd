import React, { Component } from 'react';
import StoreListing from "./StoreListing"
import { INVENTORY_MS } from '../constants/url';


class DirectoryView extends Component {
    constructor() {
        super();

        this.state = {
            stores: []
        }
    }

    componentDidMount() {
        console.log("getting stores...");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: {},
            redirect: 'follow'
        };
        // make API call with parameters and use promises to get response
        fetch(INVENTORY_MS + "/stores", requestOptions)
            .then(response => response.text())
            .then(result => {
                var stores = JSON.parse(result)[0]
                this.setState({ stores: stores });
            })
            .catch(error => console.log('error', error));
    }

    render() {
        
        let storeListings = [];

        this.state.stores.forEach(
            element => storeListings.push(<StoreListing
                                            key={element["userId"]}
                                            id={element["userId"]}
                                            name={element["storeName"]} 
                                            description={element["storeDesc"]}
                                    />));

        return (
            <div>
                <h1>Welcome to OnlyFarms</h1>
                {storeListings}
            </div>
        );
    }
}

export default DirectoryView;
