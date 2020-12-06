import React from 'react';
import Card from 'react-bootstrap/Card'
import './Listing.css'
import { AnimationWrapper } from 'react-hover-animation'

class StoreListing extends React.Component {

    render() {
        return(
            <div>
                <AnimationWrapper>
                <a style={{ cursor: "pointer" }} onClick={() => this.props.handleStoreClick(this.props.storeId, this.props.name)}>
                    <Card className="text-center" bg={'light'} border="info" style={{marginLeft:"auto", marginRight:"auto", marginBottom:"2vh", width: "80%"}}>
                        <Card.Header>Local Seller</Card.Header>
                        <Card.Title style={{paddingTop: "10px"}}>{this.props.name}</Card.Title>
                        <Card.Body style={{paddingTop: "5px"}}>
                            <h6>{this.props.description}</h6>
                        </Card.Body>
                    </Card>
                </a>
                </AnimationWrapper>
            </div>
        );
    }
}

export default StoreListing;