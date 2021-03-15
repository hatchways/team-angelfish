/** @format */
import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ExplorerPage from "./pages/Explore";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Rent from "./pages/Rent";
import Header from "./components/Header";
import Profile from "./pages/User/UserProfile";

import { theme } from "./themes/theme";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/users/auth").then((res) =>
      res.json().then((data) => {
        setUser(data.user);
      }),
    );
  }, []);

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
