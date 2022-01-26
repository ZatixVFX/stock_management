import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SHOW_REGISTER_MODAL,
  HIDE_REGISTER_MODAL,
} from "../actions/types";

const initialstate = {
  loginModal: false,
  registerModal: false,
};

export default function modalReducer(state = initialstate, action) {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return {
        ...state,
        loginModal: action.payload,
      };
    case HIDE_LOGIN_MODAL:
      return {
        ...state,
        loginModal: action.payload,
      };
    case SHOW_REGISTER_MODAL:
      return {
        ...state,
        registerModal: action.payload,
      };
    case HIDE_REGISTER_MODAL:
      return {
        ...state,
        registerModal: action.payload,
      };
    default:
      return state;
  }
}
