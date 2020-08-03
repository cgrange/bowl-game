import React, { useState } from 'react';
import Axios from 'axios';
import Arena from '../Arena/Arena';
import './Lobby.scss';

import { startTurnUrl } from '../config';

const rce = React.createElement;

function Lobby(props) {
    const lobby = JSON.parse(JSON.stringify(props.state));
    const [arena, setArena] = useState({inArena: false});
    const arenaProps = {state: arena, setState: setArena};

    function enterArena() {
        // todo show countdown
        Axios.get(startTurnUrl)
            .then(res => {
                if (res.data.valid) {
                    setArena({inArena: true, ...res.data});
                } else {
                    alert('someone is already taking their turn');
                }
                
            }).catch(err => console.log(err));
    }

    return rce('div', {className: 'Lobby'},
        rce('div', {className: 'scoreboard'},
            rce('h1', {className: 'team-score'}, 'Team 1: ' + lobby.team1Score),
            rce('h4', {className: 'prompts-left'}, 'Prompts Left: ' + lobby.promptsLeft),
            rce('h1', {className: 'team-score'}, 'Team 2: ' + lobby.team2Score),
        ),
        rce('h4', {className: 'turn-tracker'}, lobby.team1sTurn ? 'Team 1\'s Turn' : 'Team 2\'s Turn'),
        rce('button', {className: 'arena-button', onClick: enterArena}, 'ENTER ARENA!'),
        rce(Arena, arenaProps)
    );
}

export default Lobby;