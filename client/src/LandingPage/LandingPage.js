import React, { useState } from 'react';
import Counter from '../Counter/Counter';
import './LandingPage.scss';

const axios = require('axios');
const rce = React.createElement;

function LandingPage(props) {
    const timeLimit = props.state.timeLimit;
    const setTimeLimit = (value) => {
        props.state.timeLimit = value;
        props.setState(props.state);
    };

    function begin() {
        axios
            .post('http://localhost:9000/game/new-game', {
                timeLimit: timeLimit
            })
            .then(res => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
                props.state.gameStarted = true;
                props.setState(props.state);
            })
            .catch(error => {
                console.error(error)
            });
    }

    return rce('div', {className: {'LandingPage ' + props.state.gameStarted ?  'hidden' : ''}},
        rce('h5', {className: 'header'},
            'To start a new game enter the time limit for each round, then click begin'
        ),
        rce(Counter, {quantity: timeLimit, setQuantity: setTimeLimit, step: 5, min: 20, max: 90}),
        rce('button', {onClick: begin}, 'begin')
    )
}

export default LandingPage;