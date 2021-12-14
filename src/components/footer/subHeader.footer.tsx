import { createStyles, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { GetClasses } from "./classes.footer";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "84px",
    },
  })
);
export const FooterSubHeader = () => {
  const classes = useStyles();
  const genericClasses = GetClasses();
  return (
    <div className={classes.root}>
      <Link to="/croply" className={genericClasses.link}>
        © {new Date().getFullYear()} Croply -
      </Link>
      <Link to="/privacy" className={genericClasses.link}>
        {"\u200b"} Privacy {"\u200b"}
      </Link>
      <Link to="/terms" className={genericClasses.link}>
        {" "}
        - Terms of Service
      </Link>
    </div>
  );
};
