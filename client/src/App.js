/** @format */

import React, { useEffect, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Flights from "./pages/Flights/Flights";
import Hotels from "./pages/Hotels/Hotels";
import Rent from "./pages/Rent/Rent";

import { theme } from "./themes/theme";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/users/auth").then((res) =>
      res.json().then((data) => {
        setUser(data.user);
        setLoading(false);
      }),
    );
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/signup" />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/flights" component={Flights} exact />
          <Route path="/hotel" component={Hotels} exact />
          <Route path="/rent" component={Rent} exact />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
