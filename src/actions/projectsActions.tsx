import axios from "axios";
import {
  PROJECTS_LOADING_REQUEST,
  PROJECTS_LOADING_SUCCESS,
  PROJECTS_LOADING_FAIL,
} from "../constants/projectConstants";

export const getProjects = () => async (dispatch: any) => {
  try {
    dispatch({
      type: PROJECTS_LOADING_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data }: any = await axios.get("/api/projects", config);
    dispatch({ type: PROJECTS_LOADING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROJECTS_LOADING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
