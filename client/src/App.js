/** @format */

import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ExplorerPage from "./pages/Explorer/Explore";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Rent from "./pages/Rent";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Checkout from "./components/Stripe/Checkout";
import Success from "./components/Stripe/Success";
import Error from "./components/Stripe/Error";

import { Provider } from "./context";

import { theme } from "./themes/theme";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/explore" />
            {/* @TODO: Add userId props here and pass the currentUserId from Backend */}
            <Route path="/explore" component={() => <ExplorerPage />} />
            <Route exact path="/flights" component={Flights} />
            <Route exact path="/hotel" component={Hotels} />
            <Route exact path="/rent" component={Rent} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/payment-success" component={Success} />
            <Route exact path="/payment-error" component={Error} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
