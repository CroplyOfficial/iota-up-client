import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from "../constants/userConstants";

/**
 * Login the user based on the OAuth provider and the access code provided
 *
 * @param {string} type - signifies the OAuth provider (google/facebook/linkedin)
 * @param {string} code - the access code returned by the provider
 */

export const login = (type: string, code: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/users/success${type}?code=${code}`,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    window.location.href = "/";
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

/**
 * Logs the user out and the deletes the localstorage session
 */

export const logout = () => (dispatch: any) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  window.location.href = "/";
};

/**
 * Get the information about the user who is logged in
 */

export const getMyInfo = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: GET_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users/me", config);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
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
