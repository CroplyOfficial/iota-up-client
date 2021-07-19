import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({ root: {} }));
export const DashboardChat = () => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};
