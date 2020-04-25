import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/HomePage/HomePage';
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root') 
);