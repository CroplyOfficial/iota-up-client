import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { ProjectHeader } from "./header/Header";
import { useProject } from "./utils/useProject";
import { Navbar } from "../../components/navbar/Navbar";

interface IRouteParams {
  id: string;
}
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#FBFBFB",
    },
  })
);
export const ProjectOverview = () => {
  const { id } = useParams<IRouteParams>();

  const { loading, project } = useProject(id);
  const variant = "static";
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <React.Fragment>
          <ProjectHeader project={project} variant={variant} />
        </React.Fragment>
      )}
    </div>
  );
};
