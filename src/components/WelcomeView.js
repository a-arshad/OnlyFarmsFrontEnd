import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Welcome from 'react-welcome-page'

import tree from './welcomeImages/tree.png'
import peach from './welcomeImages/peach.png'
import apple from './welcomeImages/apple.png'

class WelcomeView extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    componentDidMount() {

 
        setTimeout(function() { //Start the timer
            this.setState({render: true}) //After 1 second, set render to true
        }.bind(this), 3300)
    }

    render() {
        let renderContainer = <div>        
            <Welcome
                    loopDuration={1100}
                    data={[
                    {
                    image: apple,
                    text: 'Healthy Community',
                    imageAnimation: 'flipInX',
                    textAnimation: 'bounce',
                    backgroundColor: '#F9FFDE',
                    textColor: '#002134',
                    },
                    {
                    image: tree,
                    text: 'Healthy Lifestyle',
                    imageAnimation: 'flipInX',
                    backgroundColor: '#ffd4e5',
                    textAnimation: 'fadeInUp',
                    textColor: '#002134',
                    },
                    {
                    image: peach,
                    imageAnimation: 'flipInX',
                    text: 'Healthy Produce',
                    backgroundColor: '#FF3354',
                    textAnimation: 'bounce',
                    textColor: '#002134',
                }
                
            ]}/>
            </div>
        let renderNext = false;
        if(this.state.render) { //If this.state.render == true, which is set to true by the timer.
             return (<div> <Redirect to ="/dir"/></div>);
        }
        return(
            renderContainer
        );
    

    }
}
export default WelcomeView;