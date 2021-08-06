import {
  PROJECTS_LOADING_REQUEST,
  PROJECTS_LOADING_SUCCESS,
  PROJECTS_LOADING_FAIL,
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
