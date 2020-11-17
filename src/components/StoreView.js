import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ListingTable from './ListingTable'

class StoreView extends Component {
    constructor() {
        super();
        this.state = {isEditMode: false};
    }

    render() {
        return (
            <div>
                <h1>This is your Store!</h1>
                <NavLink exact to="/" style={{paddingRight: 20}}>Home</NavLink>
                <NavLink to="/consumer">ConsumerView</NavLink>
                <ListingTable isEditMode={this.state.isEditMode}/>
                {this.state.isEditMode ? 
                    <div>
                        <Button onClick={() => this.setState({isEditMode: false})} style={{marginRight: 20}}>Cancel</Button>
                        <Button onClick={() => this.setState({isEditMode: false})}>Confirm</Button>
                    </div>
                    : <Button onClick={() => this.setState({isEditMode: true})}>Edit store</Button>}
            </div>
        );
    }

}

export default StoreView;
