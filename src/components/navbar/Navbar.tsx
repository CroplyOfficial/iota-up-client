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
import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "../../static/icons/brand-logo";
import { BrandLogoSecondary } from "../../static/icons/brand-logo.secondary";
import { useState } from "react";
import { ActionButton } from "./loginButton.navbar";
import { Container } from "../container/container";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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

enum NavbarVariants {
  main = "main",
  secondary = "secondary",
}

interface INavbarProps {
  variant?: keyof typeof NavbarVariants;
  toggleLoginModal: () => void;
}
export const Navbar = (props: INavbarProps) => {
  const { pathname } = useLocation();
  const isSecondary = pathname.includes("/projects");
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
          color: isSecondary ? theme.palette.text.secondary : "#121E31",
        },
        lineHeight: "27px",
        fontSize: "18px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 500,
        color: isSecondary ? "#ffffff" : "#717579",
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

  const classes = useStyles();

  // TODO implement context or redux

  const selectedUser = useSelector((state: RootState) => state.userLogin);
  const [userInfo] = useState((selectedUser as any).userInfo);
  const isLoggedIn = userInfo !== null;

  const actionButtonVariant = isSecondary ? "contained" : "outlined";
  const brandLogo = isSecondary ? <BrandLogoSecondary /> : <BrandLogo />;
  return (
    <div>
      <AppBar
        position="static"
        color={isSecondary ? "primary" : "transparent"}
        elevation={0}
        className={classes.root}
      >
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
            <Link to={paths.contactUs} className={classes.link}>
              <Typography variant="h5" className={classes.a}>
                Contact Us
              </Typography>
            </Link>
            <ActionButton
              variant={actionButtonVariant}
              toggleLoginModal={props.toggleLoginModal}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
