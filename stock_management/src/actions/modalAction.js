import { SHOW_MODAL, HIDE_MODAL } from "./types";

export const showModal = () => async (dispatch) =>
  dispatch({
    type: SHOW_MODAL,
    payload: true,
  });

export const hideModal = () => async (dispatch) =>
  dispatch({
    type: HIDE_MODAL,
    payload: false,
  });
