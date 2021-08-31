import {makeStyles, createStyles, useMediaQuery, Theme } from "@material-ui/core";
import React from "react";

interface IProps {
  children?: any;
  maxWidth?: keyof typeof IMaxWidth
}

enum IMaxWidth {
  "sm" = "sm",
  "md" = "md",
  "lg" = "lg",
  "xl" = "xl",
}

export const Container = (props: IProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { maxWidth } = props;
  const width = maxWidth === "xl" ? 10 : maxWidth === "lg" ? 8 : maxWidth === "md" ? 5 : maxWidth === "sm" ? 2.5 : 8;
  const matches = useMediaQuery('(max-width: 600px)');
  const marginLeft = matches ? "0.3rem" : `${width}vw`;
  const marginRight = matches ? "0.3rem" : `${width}vw`;

  const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      marginLeft,
      marginRight,
      [theme.breakpoints.down("sm")]: {
        marginLeft: "20px",
        marginRight: "20px",
      }
    }
  }));
  const classes = useStyles();

  return(
  <div className={props.className || ""}>
    <div className={classes.root}> 
    {props.children && props.children}  
    </div>
  </div>
  );
}
