import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authReducer";
import alertsReducer from "./alertsReducer";
import modalReducer from "./modalReducer";
import stockReducer from "./stockReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "stock"],
};

const rootReducer = combineReducers({
  // auth
  auth: authReducer,

  // alerts
  alerts: alertsReducer,

  // modal
  modal: modalReducer,

  // stock
  stock: stockReducer,
});
export default persistReducer(persistConfig, rootReducer);
