import React from 'react';

const rce = React.createElement;

function Lobby(props) {
    const lobby = JSON.parse(JSON.stringify(props.state));

    return rce('div', {className: 'Lobby'},
        rce('h3', {className: 'team-score'}, 'Team 1: ' + lobby.team1Score),
        rce('h5', {className: 'prompts-left'}, 'Prompts Left: ' + lobby.promptsLeft),
        rce('h3', {className: 'team-score'}, 'Team 2: ' + lobby.team2Score),
        rce('h4', {className: 'turn-tracker'}, lobby.team1sTurn ? 'Team 1\'s Turn' : 'Team 2\'s Turn')
    );
}

export default Lobby;