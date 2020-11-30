import React from 'react';
import Card from 'react-bootstrap/Card'
import './Listing.css'

class StoreListing extends React.Component {

    render() {
        return(
            <div>
                <Card bg={'light'} style={{marginLeft:"5vh", marginRight:"5vh", marginBottom:"2vh", width: "30%" }}>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Body>
                        <h6>{this.props.description}</h6>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default StoreListing;