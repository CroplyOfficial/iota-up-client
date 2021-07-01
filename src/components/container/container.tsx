import {makeStyles, createStyles, useMediaQuery } from "@material-ui/core";

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

export const Container = (props: IProps) => {
  const { maxWidth } = props;
  const width = maxWidth === "xl" ? 10 : maxWidth === "lg" ? 8 : maxWidth === "md" ? 5 : maxWidth === "sm" ? 2.5 : 8;
  const matches = useMediaQuery('(max-width: 600px)');
  const marginLeft = matches ? "0px" : `${width}vw`;
  const marginRight = matches ? "0px" : `${width}vw`;

  const useStyles = makeStyles(() => createStyles({
    root: {
      marginLeft,
      marginRight
    }
  }));
  const classes = useStyles();

  return(<div className={classes.root}> 
    {props.children && props.children}
    </div>);
}
