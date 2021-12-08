import { SHOW_MODAL, HIDE_MODAL } from "../actions/types";

const initialstate = false;

export default function modalReducer(state = initialstate, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return (state = action.payload);
    case HIDE_MODAL:
      return (state = action.payload);
    default:
      return state;
  }
}
