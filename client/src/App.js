/** @format */

import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import FlightsPage from "./pages/Flights/Flights";
import Hotels from "./pages/Hotels/Hotels";
import Rent from "./pages/Rent/Rent";

import { theme } from "./themes/theme";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/signup" />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route exact path="/flights" component={FlightsPage} />
          <Route path="/hotel" component={Hotels} exact />
          <Route path="/rent" component={Rent} exact />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
