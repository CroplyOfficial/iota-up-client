import {
  makeStyles,
  createStyles,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Color,
  Drawer,
  SwipeableDrawer,
  MenuItem,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Person from "@material-ui/icons/Person";
import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "../../static/icons/brand-logo";
import { BrandLogoSecondary } from "../../static/icons/brand-logo.secondary";
import { useState, useEffect } from "react";
import { ActionButton } from "./loginButton.navbar";
import { Container } from "../container/container";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { DashboardCreateProjectModal } from "../../pages/dashboard/createProjectModal.dashboard";
import { logout } from "../../actions/userActions";
import { useDispatch } from "react-redux";

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

/* Secondary Variant */
const SecondaryBlacklist = ["/dashboard"];
const SecondaryWhitelist = ["/projects"];
/* Secondary Variant */

interface INavbarProps {
  variant?: keyof typeof NavbarVariants;
  toggleLoginModal: () => void;
}
export const Navbar = (props: INavbarProps) => {
  const dispatch = useDispatch();
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const toggleDrawerOpen = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [showingModal, setShowModal] = useState<boolean>(false);
  const toggleShowModal = () => {
    setShowModal(!showingModal);
  };

  const handleLogout = () => {
    dispatch(logout());
    toggleDrawerOpen();
  };
  const handleCreateProject = () => {
    toggleShowModal();
    toggleDrawerOpen();
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const { pathname } = useLocation();
  const isSecondary =
    SecondaryWhitelist.some((p) => pathname.includes(p)) &&
    SecondaryBlacklist.every((p) => !pathname.includes(p));
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
        [theme.breakpoints.down("sm")]: {
          marginRight: "10px",
        },
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
        [theme.breakpoints.down("sm")]: {
          color: "#717579",
        },
      },
      b: {
        "&:hover": {
          color: isSecondary ? theme.palette.text.secondary : "#121E31",
        },
        lineHeight: "21px",
        fontSize: "16px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 500,
        color: isSecondary ? "#ffffff" : "#717579",
        [theme.breakpoints.down("sm")]: {
          paddingLeft: "20px",
          color: theme.palette.text.secondary,
        },
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
        [theme.breakpoints.down("sm")]: {
          paddingLeft: "30px",
        },
      },
      drawer: {
        minWidth: "60vw",
      },
      loginButtonMobile: {
        lineHeight: "27px",
        fontSize: "18px",
        font: "Poppins",
        fontWeight: 700,
        fontStyle: "normal",
        marginLeft: "20px",
      },
    })
  );

  const classes = useStyles();

  // TODO implement context or redux

  const selectedUser = useSelector((state: RootState) => state.userLogin);
  const [userInfo] = useState((selectedUser as any).userInfo);
  const isLoggedIn = userInfo !== null;

  const actionButtonVariant = isSecondary ? "contained" : "outlined";
  const brandLogo =
    isSecondary && !mobileView ? <BrandLogoSecondary /> : <BrandLogo />;

  function getDrawerChoices() {
    return (
      <div className={classes.drawer}>
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
        <Link to="/" className={classes.link}>
          <MenuItem className={classes.a}>Home</MenuItem>
        </Link>
        <Link to={paths.howItWorks} className={classes.link}>
          <MenuItem className={classes.a}>About Us</MenuItem>
        </Link>
        <Link to={paths.projects} className={classes.link}>
          <MenuItem className={classes.a}>Projects</MenuItem>
        </Link>
        <Link to={paths.contactUs} className={classes.link}>
          <MenuItem className={classes.a}>Contact Us</MenuItem>
        </Link>

        {!isLoggedIn ? (
          <Button
            className={classes.loginButtonMobile}
            color="secondary"
            variant="outlined"
            disableElevation
            startIcon={<Person />}
            onClick={props.toggleLoginModal}
          >
            Sign in
          </Button>
        ) : (
          <>
            <hr style={{ border: "0.03px solid rgba(0,0,0,0.05)" }} />
            <Link to="/dashboard" className={classes.link}>
              <MenuItem className={classes.b}>Profile</MenuItem>
            </Link>
            <Link to="/dashboard/projects" className={classes.link}>
              <MenuItem className={classes.b}>My Projects</MenuItem>
            </Link>
            <Link to="/dashboard/favorites" className={classes.link}>
              <MenuItem className={classes.b}>My Favorites</MenuItem>
            </Link>
            <hr style={{ border: "0.03px solid rgba(0,0,0,0.05)" }} />
            <Link to="#create-project" className={classes.link}>
              <MenuItem className={classes.b} onClick={handleCreateProject}>
                Create Project
              </MenuItem>
            </Link>
            <Link to="/logout" className={classes.link} onClick={handleLogout}>
              <MenuItem className={classes.b}>Logout</MenuItem>
            </Link>
          </>
        )}
      </div>
    );
  }

  function renderDesktop() {
    return (
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
    );
  }
  function renderMobile() {
    return (
      <Toolbar variant="dense">
        {/* 
      HELP!
      hitbox of IconButton is shifted up but doesnt show in firefox dev tools
      */}
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            className: "TODO",
          }}
          onClick={toggleDrawerOpen}
        >
          <MenuIcon />
          <SwipeableDrawer
            onOpen={toggleDrawerOpen}
            {...{
              anchor: "left",
              open: isDrawerOpen,
              onClose: toggleDrawerOpen,
            }}
          >
            {getDrawerChoices()}
          </SwipeableDrawer>
        </IconButton>
      </Toolbar>
    );
  }

  return (
    <div>
      <DashboardCreateProjectModal
        showing={showingModal}
        onClick={toggleShowModal}
      />
      <AppBar
        position="static"
        color={isSecondary ? "primary" : "transparent"}
        elevation={0}
        className={classes.root}
      >
        <Container>
          {(mobileView && renderMobile()) || renderDesktop()}
        </Container>
      </AppBar>
    </div>
  );
};
