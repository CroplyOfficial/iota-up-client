import axios from "axios";
import {
  PROJECTS_LOADING_REQUEST,
  PROJECTS_LOADING_SUCCESS,
  PROJECTS_LOADING_FAIL,
  GET_TRENDING_SUCCESS,
  GET_TRENDING_FAIL,
  GET_TRENDING_REQUEST,
  GET_RECOMMENDED_REQUEST,
  GET_RECOMMENDED_SUCCESS,
  GET_RECOMMENDED_FAIL,
  GET_LATEST_REQUEST,
  GET_LATEST_SUCCESS,
  GET_LATEST_FAIL,
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
