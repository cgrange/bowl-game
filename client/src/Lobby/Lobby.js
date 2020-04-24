import React from 'react';
import './Lobby.scss';

const rce = React.createElement;

function Lobby(props) {
    const lobby = JSON.parse(JSON.stringify(props.state));

    function enterArena() {
        alert('entering arena!');
    }

    return rce('div', {className: 'Lobby'},
        rce('div', {className: 'scoreboard'},
            rce('h1', {className: 'team-score'}, 'Team 1: ' + lobby.team1Score),
            rce('h4', {className: 'prompts-left'}, 'Prompts Left: ' + lobby.promptsLeft),
            rce('h1', {className: 'team-score'}, 'Team 2: ' + lobby.team2Score),
        ),
        rce('h4', {className: 'turn-tracker'}, lobby.team1sTurn ? 'Team 1\'s Turn' : 'Team 2\'s Turn'),
        rce('button', {className: 'arena-button', onClick: enterArena}, 'ENTER ARENA!')
    );
}

export default Lobby;