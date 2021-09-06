import axios from "axios";
import {
  PROJECTS_LOADING_REQUEST,
  PROJECTS_LOADING_SUCCESS,
  PROJECTS_LOADING_FAIL,
  PROJECT_LOADING_REQUEST,
  PROJECT_LOADING_SUCCESS,
  PROJECT_LOADING_FAIL,
  GET_TRENDING_SUCCESS,
  GET_TRENDING_FAIL,
  GET_TRENDING_REQUEST,
  GET_RECOMMENDED_REQUEST,
  GET_RECOMMENDED_SUCCESS,
  GET_RECOMMENDED_FAIL,
  GET_LATEST_REQUEST,
  GET_LATEST_SUCCESS,
  GET_LATEST_FAIL,
  GET_MY_PROJECTS_REQUEST,
  GET_MY_PROJECTS_SUCCESS,
  GET_MY_PROJECTS_FAIL,
} from "../constants/projectConstants";

/**
 * Get the project by ID and save them to the state
 *
 * @reducer  loadProject
 */

export const getProject = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: PROJECT_LOADING_REQUEST,
    });
    const { data } = await axios.get(`/api/projects/by-id/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: PROJECT_LOADING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_LOADING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * Get all the projects and set the state to the object
 * array of IProject
 *
 * @reducer  loadProjects
 */

export const getProjects =
  (query?: string, filters?: string, order?: string) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: PROJECTS_LOADING_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data }: any = await axios.get(
        `/api/projects?q=${query}&filters=${filters}&order=${order}`,
        config
      );
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

/**
 * Get all the trending projects from the backend route
 *
 * @reducer loadTrending
 */

export const getTrendingProjects = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_TRENDING_REQUEST,
    });

    const { data }: any = await axios.get("/api/projects/trending", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: GET_TRENDING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TRENDING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * get all the recommended project
 *
 * @access  Requires authentication
 * @reducer loadRecommended
 */

export const getRecommendedProjects = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_RECOMMENDED_REQUEST,
    });

    const { data }: any = await axios.get("/api/projects/recommended", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: GET_RECOMMENDED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RECOMMENDED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * load all the latest projects
 *
 * @reducer loadLatest
 */

export const getLatestProjects = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_LATEST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data }: any = await axios.get("/api/projects", config);
    data.sort((a: any, b: any) => {
      return new Date(b.created).valueOf() - new Date(a.created).valueOf();
    });
    console.log(data);
    dispatch({ type: GET_LATEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LATEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * Get all the projects that the user which is logged in has already
 * created by accessing the user id
 *
 * @reducer loadMyProjects
 */

export const getMyProjects = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: GET_MY_PROJECTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data }: any = await axios.get(
      `/api/projects/by-user/${userInfo._id}`,
      config
    );
    dispatch({ type: GET_MY_PROJECTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MY_PROJECTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
