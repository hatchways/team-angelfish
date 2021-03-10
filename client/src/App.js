import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';
import Header from './component/Header/Header';
import FlightsPage from './pages/Flights/Flights';

import './App.css';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path='/' component={Header} />
        <Route exact path='/flights' component={FlightsPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
