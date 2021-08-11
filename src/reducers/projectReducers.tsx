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

export const loadProjectsReducer = (state = {}, action: any) => {
  switch (action.type) {
    case PROJECTS_LOADING_REQUEST:
      return { loading: true };
    case PROJECTS_LOADING_SUCCESS:
      return { loading: false, projects: action.payload };
    case PROJECTS_LOADING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const loadProjectReducer = (state = {}, action: any) => {
  switch (action.type) {
    case PROJECT_LOADING_REQUEST:
      return { loading: true };
    case PROJECT_LOADING_SUCCESS:
      return { loading: false, project: action.payload };
    case PROJECT_LOADING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const loadTrendingProjectsReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_TRENDING_REQUEST:
      return { loading: true };
    case GET_TRENDING_SUCCESS:
      return { loading: false, trendingProjects: action.payload };
    case GET_TRENDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const loadReccomendedProjectsReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_RECOMMENDED_REQUEST:
      return { loading: true };
    case GET_RECOMMENDED_SUCCESS:
      return { loading: false, recommendedProjects: action.payload };
    case GET_RECOMMENDED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const loadLatestProjectsReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_LATEST_REQUEST:
      return { loading: true };
    case GET_LATEST_SUCCESS:
      return { loading: false, latestProjects: action.payload };
    case GET_LATEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const loadMyProjectsReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_MY_PROJECTS_REQUEST:
      return { loading: true };
    case GET_MY_PROJECTS_SUCCESS:
      return { loading: false, myProjects: action.payload };
    case GET_MY_PROJECTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
