import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authReducer";
import alertsReducer from "./alertsReducer";
import modalReducer from "./modalReducer";
import stockReducer from "./stockReducer";
import userStockReducer from "./userStockReducer";

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

  // user stock
  user_stock: userStockReducer,
});
export default persistReducer(persistConfig, rootReducer);
