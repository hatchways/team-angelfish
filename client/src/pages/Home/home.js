/** @format */

import React from "react";
import { SnackbarProvider } from "notistack";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Explore from "../Explorer/Explore";
import Flights from "../Flights";
import Hotels from "../Hotels";
import Header from "../../components/Header";
import TestRoute from "../../components/Cart/addToCartTestPage";
import Profile from "../User/Profile";
import Checkout from "../../components/Stripe/Checkout";
import Success from "../../components/Stripe/Success";
import Error from "../../components/Stripe/Error";
import Cars from "../../pages/Cars";

import { Provider } from "../../context";

import "../../App.css";

function App() {
  return (
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
            <Route exact path="/test" component={TestRoute} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/payment-success" component={Success} />
            <Route exact path="/payment-error" component={Error} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
