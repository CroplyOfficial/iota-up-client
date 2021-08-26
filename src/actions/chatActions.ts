import {
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAIL,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAIL,
} from "../constants/chatConstants";
import axios from "axios";

/**
 * Get all the chats the logged in user is a part of
 */

export const getMyChats = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: GET_CHATS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/chats/@me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: GET_CHATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const chatById =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: GET_CHAT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.get(`/api/chats/by-id/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({
        type: GET_CHAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CHAT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
