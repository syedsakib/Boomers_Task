import React from "react";
//import './App.css';

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";

import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/checkout" exact component={CheckoutPage} />
            <Route path="/product/:category" exact component={CategoryPage} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
