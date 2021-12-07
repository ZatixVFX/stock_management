import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      if (state.length > 0) {
        state.shift(0);
      }
      return [...state, action.payload];
    case REMOVE_ALERT:
      return initialState.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
