import {
  makeStyles,
  createStyles,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Color,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { BrandLogo } from "../../static/icons/brand-logo";
import { BrandLogoSecondary } from "../../static/icons/brand-logo.secondary";
import { useState } from "react";
import { ActionButton } from "./loginButton.navbar";
import { Container } from "../container/container";

const paths = {
  root: "/",
  howItWorks: "/about",
  projects: "/projects",
  creators: "/creators",
  contactUs: "/contact",
  dashboard: "/dashboard",
  settings: "/settings",
  login: "/login",
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "20px",
      paddingBottom: "20px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "inherit",
      marginLeft: "0.7rem",
      marginRight: "0.7rem",
    },
    a: {
      "&:hover": {
        color: "#121E31",
      },
      lineHeight: "27px",
      fontSize: "18px",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      color: "#717579",
    },
    loginButton: {
      lineHeight: "27px",
      fontSize: "18px",
      fontFamiliy: "Poppins",
      fontStyle: "normal",
      fontWeight: 700,
    },
    iconButton: {
      paddingLeft: 0,
    },
  })
);
const useAltStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "inherit",
      marginLeft: "0.7rem",
      marginRight: "0.7rem",
    },
    a: {
      "&:hover": {
        color: "#121E31",
      },
      lineHeight: "27px",
      fontSize: "18px",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      color: "#ffffff",
    },
    loginButton: {
      lineHeight: "27px",
      fontSize: "18px",
      fontFamiliy: "Poppins",
      fontStyle: "normal",
      fontWeight: 700,
    },
    iconButton: {
      paddingLeft: 0,
    },
  })
);

enum NavbarVariants {
  main = "main",
  secondary = "secondary",
}

interface INavbarProps {
  variant?: keyof typeof NavbarVariants;
}
export const Navbar = (props: INavbarProps) => {
  const isSecondary = props.variant === NavbarVariants.secondary;
  const mainClasses = useStyles();
  // TODO may be redundant ( use logic within usestyles, move usestyles inside component scope)
  const altClasses = useAltStyles();
  const classes = isSecondary ? altClasses : mainClasses;

  // TODO implement context or redux
  const initialState = {};
  const [userInfo, setUserInfo] = useState(initialState);

  const appBarColor = isSecondary ? "primary" : "transparent";
  const actionButtonVariant = isSecondary ? "contained" : "outlined";
  const brandLogo = isSecondary ? <BrandLogoSecondary /> : <BrandLogo />;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Container>
          <Toolbar variant="dense">
            {/* Brand */}
            <Link to={paths.root}>
              <IconButton
                className={classes.iconButton}
                edge="start"
                aria-label="logo"
                color="inherit"
              >
                {brandLogo}
              </IconButton>
            </Link>
            {/* Brand */}

            <Typography className={classes.title}></Typography>

            <Link to={paths.root} className={classes.link}>
              <Typography variant="h5" className={classes.a}>
                Home
              </Typography>
            </Link>
            <Link to={paths.howItWorks} className={classes.link}>
              <Typography variant="h5" className={classes.a}>
                How It Works
              </Typography>
            </Link>
            <Link to={paths.projects} className={classes.link}>
              <Typography variant="h5" className={classes.a}>
                Projects
              </Typography>
            </Link>
            <Link to={paths.creators} className={classes.link}>
              <Typography variant="h5" className={classes.a}>
                Creators
              </Typography>
            </Link>
            <Link to={paths.contactUs} className={classes.link}>
              <Typography variant="h5" className={classes.a}>
                Contact Us
              </Typography>
            </Link>
            <Link to={paths.login} className={classes.link}>
              <ActionButton variant={actionButtonVariant} />
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
