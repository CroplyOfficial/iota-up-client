import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#121E31",
    },
    category: {
      display: "flex",
      flexDirection: "column",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
    h2: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "30px",
      paddingBottom: "20px",
    },
    span: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
    },
  })
);
export const GetClasses = () => useStyles();
