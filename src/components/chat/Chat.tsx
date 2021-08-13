import { makeStyles, createStyles } from "@material-ui/core";
import { MessageBox } from "react-chat-elements-typescript";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "fixed",
      bottom: 0,
      right: 0,
      transform: "translateX(-10px)",
      width: "288px",
      height: "48px",
      backgroundColor: "white",
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      MozBorderRadiusTopLeft: "10px",
      MozBorderRadiusTopRight: "10px",
    },
  })
);
export const Chat = () => {
  const classes = useStyles();

  return <div className={classes.root}></div>;
};
