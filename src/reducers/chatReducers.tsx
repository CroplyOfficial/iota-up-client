import {
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAIL,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAIL,
} from "../constants/chatConstants";

export const loadMyChats = (state = {}, action: any) => {
  switch (action.type) {
    case GET_CHATS_REQUEST:
      return { loading: true };
    case GET_CHATS_SUCCESS:
      return { loading: false, chats: action.payload };
    case GET_CHATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const loadChatById = (state = {}, action: any) => {
  switch (action.type) {
    case GET_CHAT_REQUEST:
      return { loading: true };
    case GET_CHAT_SUCCESS:
      return { loading: false, chat: action.payload };
    case GET_CHAT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
