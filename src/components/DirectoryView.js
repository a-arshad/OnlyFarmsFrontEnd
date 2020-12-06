import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import StoreListing from "./StoreListing"
import Banner from "./Banner"
import { INVENTORY_MS } from '../constants/url';


class DirectoryView extends Component {
    constructor() {
        super();

        this.state = {
            stores: []
        }
    }

    handleStoreClick(storeId, storeName) {
        console.log("hello!")
        this.props.history.push({
            pathname: "/consumer",
            search: "?storeId=" + storeId + "&storeName=" + storeName,
        });
    }

    componentDidMount() {
        console.log("getting stores...");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({}),
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
        console.log("oh damn" + this.props.location.pathname)

        let storeListings = [];

        this.state.stores.forEach(
            element => storeListings.push(
                <Col md={6} key={element["userId"]}>
                    <StoreListing
                        key={element["userId"]}
                        storeId={element["userId"]}
                        name={element["storeName"]} 
                        description={element["storeDesc"]}
                        handleStoreClick={this.handleStoreClick.bind(this)}/>
                </Col>)
            );
        
        return (
            <div>
                <Banner auth={this.props.auth}/>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                {storeListings}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DirectoryView;
