/** @format */
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ExplorerPage from "./pages/Explore";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Rent from "./pages/Rent";
import Header from "./components/Header";
import Profile from "./pages/User/UserProfile";

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
            <Route path="/explore" component={ExplorerPage} />
            <Route exact path="/flights" component={Flights} />
            <Route exact path="/hotel" component={Hotels} />
            <Route exact path="/rent" component={Rent} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
