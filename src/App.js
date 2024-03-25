// src/App.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CurrencyConverter from './CurrencyConverter';

function App() {
  return (
    <div className="App">
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
