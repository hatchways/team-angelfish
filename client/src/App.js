/** @format */
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ExplorerPage from "./pages/Explore";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Rent from "./pages/Rent";
import Header from "./components/Header";
import Profile from "./pages/User/UserProfile";

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
          <Redirect exact from="/" to="/explore" />
          <Route path="/explore" component={ExplorerPage} />
          <Route exact path="/flights" component={Flights} />
          <Route exact path="/hotel" component={Hotels} />
          <Route exact path="/rent" component={Rent} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/error" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
