import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SHOW_REGISTER_MODAL,
  HIDE_REGISTER_MODAL,
} from "./types";

export const showModal = (modal) => async (dispatch) => {
  if (modal === "login") {
    dispatch({
      type: SHOW_LOGIN_MODAL,
      payload: true,
    });
  } else if (modal === "register") {
    dispatch({
      type: SHOW_REGISTER_MODAL,
      payload: true,
    });
  }
};

export const hideModal = (modal) => async (dispatch) => {
  if (modal === "login") {
    dispatch({
      type: HIDE_LOGIN_MODAL,
      payload: false,
    });
  } else if (modal === "register") {
    dispatch({
      type: HIDE_REGISTER_MODAL,
      payload: false,
    });
  }
};
