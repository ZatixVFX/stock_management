import Home from "./components/home/Home";

import setAuthToken from "./utils/setAuthToken";

import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
