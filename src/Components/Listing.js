import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import './Listing.css'

class Listing extends React.Component {
    render() {
        return(
            <div>
                <Card style={{marginLeft:"5vh", marginRight:"5vh", marginBottom:"2vh"}}>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Body>
                        <div style={{marginLeft:"1vh", marginRight:"1vh"}}>
                            <Row>
                                <Col>
                                    <h4>Description: </h4>
                                    <h4>Price: </h4>
                                    <h4>Quantity: </h4>
                                </Col>
                                <Col>
                                    <h4 className="desc">{this.props.description}</h4>
                                    <h4 className="desc">{this.props.price}</h4>
                                    <h4 className="desc">{this.props.quantity}</h4>
                                </Col>
                            </Row>
                        </div>  
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Listing;