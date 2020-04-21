import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import Axios from 'axios';

const rce = React.createElement;

function App() {
  const [landingPage, setLandingPage] = useState({});
  const landingPageProps = {state: landingPage, setState: setLandingPage};

  useEffect(() => {
    Axios.get('http://localhost:9000/game/landing-page')
    .then((response) => {
      console.log(response.data);
      setLandingPage(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return rce('div', {className: 'App'},
    rce(LandingPage, landingPageProps)
  )
}

export default App;
