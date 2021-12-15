import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store, persistor } from "./store";

import setAuthToken from "./utils/setAuthToken";

import Home from "./components/home/Home";

// styles
import "./styles.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
