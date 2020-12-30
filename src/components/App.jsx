import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Pages
import Home from "../pages/Home";
import GetShoes from "../pages/GetShoes";
import Checkout from "../pages/Checkout";

const App = () => (
    <Router>
        <Switch>
            <Route id="home" path='/' exact>
                <Home />
            </Route>
            <Route id="get_shoes" path='/get-shoes' exact>
                <GetShoes />
            </Route>
            <Route id="checkout" path='/checkout' exact>
                <Checkout />
            </Route>
        </Switch>
    </Router>
);

export default App;
