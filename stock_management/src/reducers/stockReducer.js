import {
  GET_STOCK,
  GET_USERSTOCK,
  ADD_USERSTOCK,
  DEL_USERSTOCK,
  STOCK_ERROR,
  CLEAR_ERRORS,
  STOCK_ALERT,
  RE_STOCK_ALERT,
} from "../actions/types";

const initialstate = {
  available_stock: [],
  user_stock: null,
  stock_alert: [],
  error: null,
  successfullyAddedStock_msg: null,
  loading: true,
};

export default function stockReducer(state = initialstate, action) {
  switch (action.type) {
    case GET_STOCK:
      return {
        ...state,
        available_stock: action.payload,
        loading: false,
      };
    case GET_USERSTOCK:
      return {
        ...state,
        user_stock: action.payload,
        loading: false,
      };
    case ADD_USERSTOCK:
      return {
        ...state,
        successfullyAddedStock_msg: action.payload,
      };
    case STOCK_ALERT:
      return {
        ...state,
        stock_alert: [action.payload],
      };
    case RE_STOCK_ALERT:
      return {
        ...state,
        stock_alert: state.stock_alert.filter(
          (alert) => alert.id !== action.payload
        ),
      };
    case STOCK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
