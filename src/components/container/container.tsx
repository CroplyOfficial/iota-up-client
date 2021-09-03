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
  "null" = "null",
}

export const Container = (props: IProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { maxWidth } = props;
  const width = maxWidth === "xl" ? 10 : maxWidth === "lg" ? 8 : maxWidth === "md" ? 5 : maxWidth === "sm" ? 2.5 : maxWidth === "null" ? 0 : 8;
  const matches = useMediaQuery('(max-width: 600px)');
  const notNull = maxWidth !== IMaxWidth.null;
  const marginLeft = matches && notNull ? "0.3rem" : `${width}vw`;
  const marginRight = matches && notNull ? "0.3rem" : `${width}vw`;

  const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      marginLeft,
      marginRight,
      [theme.breakpoints.down("sm")]: {
        marginLeft: notNull ? "20px" : "0px",
        marginRight: notNull ? "20px" : "0px",
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
