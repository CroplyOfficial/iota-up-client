import {
  createStyles,
  makeStyles,
  Button,
  Theme,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "40vh",
      width: "300px",
    },
    ul: {
      padding: "0px",
      margin: "0px",
      listStyle: "none",
      marginRight: "25px",
    },
    li: {
      width: "100%",
      textAlignLast: "end",
      height: "50px",
      display: "flex",
      "&:hover div": {
        minWidth: "15px",
        backgroundColor: theme.palette.primary.main,
        transition: ".3s ease-out",
      },
    },
    link: {
      textDecoration: "none",
      color: "inherit",
      minWidth: "100%",
    },
    text: {
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      color: theme.palette.text.hint,
      textTransform: "none",
      textAlignLast: "end",
      MozTextAlignLast: "end",
    },
    button: {
      "&:hover  *": {
        fontWeight: 700,
        color: theme.palette.primary.main,
        transition: "0.3s ease-out all",
      },
      padding: "10px",
      width: "100%",
      textAlignLast: "end",
      display: "flex",
      justifyContent: "flex-end",
      height: "46px",
    },
    logout: {
      flexGrow: 4,
      textAlign: "end",
      textAlignLast: "end",
    },
    activeBar: {
      height: "46px",
      color: "white",
      borderRadius: "0 10px 10px 0",
      position: "absolute",
    },
  })
);
export const DashboardSideNavbar = () => {
  const classes = useStyles();
  const links = [
    { title: "My Profile", path: "/dashboard/profile", classes: [] },
    { title: "My Projecs", path: "/dashboard/projects", classes: [] },
    { title: "My Favorites", path: "/dashboard/favorites", classes: [] },
    { title: "Chat", path: "/dashboard/chat", classes: [] },
    { title: "Logout", path: "/dashboard/logout", classes: [classes.logout] },
  ];
  return (
    <nav className={classes.root}>
      <ul className={classes.ul}>
        {links.map((link) => (
          <li className={classes.li} key={"link-" + link.title}>
            <div className={classes.activeBar}></div>
            <Link className={classes.link} to={link.path}>
              <Button className={`${classes.button} ${link.classes.join(" ")}`}>
                <span className={classes.text}>{link.title}</span>
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
