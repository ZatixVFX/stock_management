import { v4 as uuid } from "uuid";

import {
  GET_STOCK,
  GET_USERSTOCK,
  ADD_USERSTOCK,
  DEL_USERSTOCK,
  STOCK_ALERT,
  RE_STOCK_ALERT,
  CLEAR_USERSTOCK,
  STOCK_ERROR,
  CLEAR_ERRORS,
} from "./types";

import axios from "axios";

const config = {
  headers: {
    "x-auth-token": localStorage.token,
  },
};

export const get_stock = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/stock");

    dispatch({
      type: GET_STOCK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
    });
  }
};

export const get_UserStock = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/stock/UserStock",
      config
    );

    dispatch({
      type: GET_USERSTOCK,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: STOCK_ERROR,
      payload: err.response.data.msg,
    });
  }
};

export const add_UserStock =
  (formData, stockCollection_ID = null) =>
  async (dispatch) => {
    try {
      if (stockCollection_ID) {
        const res = await axios.put(
          `http://localhost:5000/api/stock/${stockCollection_ID}`,
          formData,
          config
        );

        console.log(res.data.msg);
        dispatch({
          type: ADD_USERSTOCK,
          payload: res.data.msg,
        });
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/stock/",
          formData,
          config
        );

        console.log(res.data.msg);
        dispatch({
          type: ADD_USERSTOCK,
          payload: res.data.msg,
        });
      }
    } catch (err) {
      dispatch({
        type: STOCK_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

export const del_UserStock = (stock_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/stock/${stock_id}`,
      config
    );

    dispatch({
      type: DEL_USERSTOCK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: err.response.data,
    });
  }
};

export const stockAlert =
  (msg, type, timeout = 5000) =>
  (dispatch) => {
    const id = uuid();

    dispatch({
      type: STOCK_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(
      () =>
        dispatch({
          type: RE_STOCK_ALERT,
          payload: id,
        }),
      timeout
    );
  };

// Clear User stock
export const clearUserStock = () => (dispatch) =>
  dispatch({ type: CLEAR_USERSTOCK });

// Clear Errors
export const clearErrors = () => (dispatch) => dispatch({ type: CLEAR_ERRORS });
