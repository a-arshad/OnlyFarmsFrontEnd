import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Listing.css";
import { Button } from "react-bootstrap";

class Listing extends React.Component {
	render() {
		return (
			<div>
				<Card
					bg={"light"}
					style={{ marginLeft: "5vh", marginRight: "5vh", marginBottom: "2vh" }}
				>
					<Card.Title>{this.props.name}</Card.Title>
					<Card.Body>
						<div style={{ marginLeft: "1vh", marginRight: "1vh" }}>
							<Row>
								<Col>
									<h4>Description: </h4>
									<h4>Price: </h4>
									<h4>Quantity: </h4>
								</Col>
								<Col>
									<h5 className="desc">{this.props.description}</h5>
									<h5 className="desc">${this.props.price}</h5>
									{this.props.isEditMode ? (
										<input
											type="number"
											min="0"
											className="desc"
											defaultValue={this.props.amount}
											onChange={(event) =>
												this.props.updateStock(
													this.props.name,
													event.target.value
												)
											}
										/>
									) : (
										<h5 className="desc">{this.props.amount}</h5>
									)}
								</Col>
								<Col>
									{this.props.isConsumer && (
										<Button
											onClick={() =>
												this.props.addToCart(this.props.id, this.props.name)
											}
										>
											Add to cart
										</Button>
									)}
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
