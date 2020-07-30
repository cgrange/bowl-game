import React, { useState, useEffect } from 'react';
import './App.scss';
import LandingPage from './LandingPage/LandingPage';
import Lobby from './Lobby/Lobby';
import PromptPage from './PromptPage/PromptPage';
import { eventsUrl } from './config';

const rce = React.createElement;

function App() {
  const [landingPage, setLandingPage] = useState({});
  const landingPageProps = {state: landingPage, setState: setLandingPage};

  const [lobby, setLobby] = useState({});
  const lobbyProps = {state: lobby, setState: setLobby};

  useEffect(() => {
    const eventSource = new EventSource(eventsUrl);
    eventSource.onopen = (e) => {
      console.log('open: ' + e.data);
    };
    eventSource.onmessage = (e) => {
      console.log('message: ' + e.data);
    };
    eventSource.onerror = (e) => {
      console.log('error');
      switch( e.target.readyState ) {
        // if reconnecting
        case EventSource.CONNECTING:
          console.log('Reconnecting…');
          break;
        // if error was fatal
        case EventSource.CLOSED:
          console.log('Connection failed. Will not retry.');
          break;
      }
    };
    eventSource.addEventListener('state-change', (e) => {
      const gameState = JSON.parse(e.data);
      setLandingPage({
        timeLimit: gameState.timeLimit,
        gameStarted: gameState.gameStarted
      });
      setLobby({
        team1Score: gameState.team1Score,
        team2Score: gameState.team2Score,
        team1sTurn: gameState.team1sTurn,
        promptsLeft: gameState.promptsLeft
      });
    });
  }, []);

  return rce('div', {className: 'App'},
    rce(LandingPage, landingPageProps),
    rce('div', {className: landingPageProps.state.gameStarted ? '' : 'hidden'}, 
      rce(PromptPage)
    ),
    rce(Lobby, lobbyProps),
  )
}

export default App;
