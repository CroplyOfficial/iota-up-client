import { ReactPropTypes } from "react";
import { Route, RouteProps, useParams } from "react-router-dom";

interface IRouteParams {
  id: string;
}
export const ProjectOverview = () => {
  const { id } = useParams<IRouteParams>();
  return <div>{id || "a"}</div>;
};
