import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
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
        <Home />
      </PersistGate>
    </Provider>
  );
}

export default App;
