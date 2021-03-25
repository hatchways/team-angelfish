/** @format */

import React from "react";
import LandingPage from "./pages/LandingPage/LadingPage";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./pages/Home/home";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
