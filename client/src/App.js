/** @format */

import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Explore from "./pages/Explorer/Explore";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Cars from "./pages/Cars";
import Header from "./components/Header";
import Profile from "./pages/User/Profile";
import Checkout from "./components/Stripe/Checkout";
import Success from "./components/Stripe/Success";
import Error from "./components/Stripe/Error";

import { Provider } from "./context";

import { theme } from "./themes/theme";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2}>
        <Provider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Redirect exact from="/" to="/explore" />
              <Route path="/explore" component={Explore} />
              <Route exact path="/flights" component={Flights} />
              <Route exact path="/hotel" component={Hotels} />
              <Route exact path="/cars" component={Cars} />
              <Route path="/profile" component={Profile} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/payment-success" component={Success} />
              <Route exact path="/payment-error" component={Error} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export default App;
