import { GET_USERSTOCK, CLEAR_USERSTOCK } from "../actions/types";

const initialstate = null;

export default function userStockReducer(state = initialstate, action) {
  switch (action.type) {
    case GET_USERSTOCK:
      return (state = action.payload);

    case CLEAR_USERSTOCK:
      return (state = null);
    default:
      return state;
  }
}
