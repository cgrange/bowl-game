import React from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from './LandingPage/LandingPage';

const rce = React.createElement;

function App() {
  return rce('div', {className: 'App'},
    rce(LandingPage)
  )
}

export default App;
