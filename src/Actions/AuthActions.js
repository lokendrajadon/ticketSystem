import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../Constants/AuthConstants";
import Axios from "axios";
export const userRegister =
  ({ name, email, phone, password }) =>
  async (dispatch) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    });
    try {
      const { data } = await Axios.post("/auth/register", {
        name,
        email,
        phone,
        password,
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data.user,
      });
      localStorage.setItem("userRegister", JSON.stringify(data.user));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userLogin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await Axios.post("http://localhost:3051/auth/login", {
      email,
      password,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userLogin", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOut = (history) => (dispatch) => {
  localStorage.removeItem("userLogin");
  localStorage.removeItem("allTickets");
  localStorage.removeItem("userRegister");

  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/login";
};
