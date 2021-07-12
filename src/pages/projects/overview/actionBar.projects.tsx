import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);
export const ProjectsActionBar = () => {
  const classes = useStyles();
  return <div className={classes.root}> </div>;
};
