import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './component/Header/Header'
import Flights from './pages/Flights/Flights'
import Hotels from './pages/Hotels/Hotels'
import Rent from './pages/Rent/Rent'

function App() {
  return (
    <Router>
    <div>
    <Header />
    <Switch>
    <Route path="/" component={Flights} exact />
    <Route path="/hotel" component={Hotels} exact />
    <Route path="/rent" component={Rent} exact />
    </Switch>
    </div>
    </Router>
  )
}

export default App
