import React from 'react';
import Counter from '../Counter/Counter';
import './LandingPage.scss';
import { newGameUrl } from '../config';

const axios = require('axios');
const rce = React.createElement;

function LandingPage(props) {
    const landingPage = JSON.parse(JSON.stringify(props.state)); // somewhat deep copy
    const setTimeLimit = (value) => {
        landingPage.timeLimit = value;
        props.setState(landingPage);
    };

    function begin() {
        axios
            .post(newGameUrl, {
                timeLimit: landingPage.timeLimit
            })
            .then(res => {
                landingPage.gameStarted = true;
                props.setState(landingPage);
            })
            .catch(error => {
                console.error(error)
            });
    }

    return rce('div', {className: landingPage.gameStarted ?  'LandingPage hidden' : 'LandingPage'},
        rce('h5', {className: 'header'},
            'To start a new game enter the time limit for each round, then click begin'
        ),
        rce('div', {className: 'counter-wrapper'},
            rce(Counter, {quantity: landingPage.timeLimit || 45, setQuantity: setTimeLimit, step: 5, min: 20, max: 90}),
        ),
        rce('button', {className: 'begin-button', onClick: begin}, 'begin')
    )
}

export default LandingPage;