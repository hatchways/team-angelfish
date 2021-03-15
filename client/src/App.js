/** @format */

import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ExplorerPage from "./pages/Explore";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Rent from "./pages/Rent";
import Profile from "./pages/Profile/Profile"
import Header from "./components/Header";
import { theme } from "./themes/theme";

import "./App.css";


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect exact from="/" to="/explore" />
          <Route path="/explore" component={ExplorerPage} />
          <Route exact path="/flights" component={Flights} />
          <Route exact path="/hotel" component={Hotels} />
          <Route exact path="/rent" component={Rent} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
