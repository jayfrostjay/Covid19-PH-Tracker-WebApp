import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/HomePage/HomePage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faViruses, faSkullCrossbones, faUserShield, faUsers, faInfoCircle, faHistory } from '@fortawesome/free-solid-svg-icons/';
library.add(faViruses, faSkullCrossbones, faUserShield, faUsers, faInfoCircle, faHistory);

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root') 
);