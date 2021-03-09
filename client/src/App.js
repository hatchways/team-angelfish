/** @format */

import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import { theme } from "./themes/theme";

import "./App.css";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<Route exact path="/" render={() => <Redirect to="/signup" />} />
				<Route path="/signup" render={() => <Signup />} />
				<Route path="/signin" render={() => <Signin />} />
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
