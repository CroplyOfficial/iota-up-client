import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { HTMLProps } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      color: "black",
      overflowX: "hidden",
    },
    headerStripe: {
      width: "100%",
      height: "225px",
      background: theme.palette.primary.main,
    },
  })
);

export const DashboardHeaderStripe = (props: HTMLProps<HTMLElement>) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.headerStripe}></div>
      {props.children}
    </div>
  );
};
