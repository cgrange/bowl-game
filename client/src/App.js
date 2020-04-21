import React, { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage';

const rce = React.createElement;

function App() {
  const [landingPage, setLandingPage] = useState({timeLimit: 45, gameStarted: false});
  const landingPageProps = {state: landingPage, setState: setLandingPage};

  return rce('div', {className: 'App'},
    rce(LandingPage, landingPageProps)
  )
}

export default App;
