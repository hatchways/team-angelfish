/** @format */

import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import FlightsPage from "./pages/Flights/Flights";
import Hotels from "./pages/Hotels/Hotels";
import Rent from "./pages/Rent/Rent";
import Header from "./component/Header/Header";

import { theme } from "./themes/theme";
import Checkout from "./component/Stripe/Checkout";
import Success from "./component/Stripe/Success";
import ErrorPage from "./component/Stripe/Error";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect exact from="/" to="/signup" />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route exact path="/flights" component={FlightsPage} />
          <Route path="/hotel" component={Hotels} exact />
          <Route path="/rent" component={Rent} exact />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/error" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
