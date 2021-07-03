import {
  makeStyles,
  createStyles,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Person } from "@material-ui/icons";
import { BrandLogo } from "../../static/icons/brand-logo";
import { useState } from "react";
import { ActionButton } from "./loginButton.navbar";

const paths = [
  {
    name: 'How it Works',
    url: '/explained'
  }, {
    name: 'Projects',
    url: '/projects'
  }, {
    name: 'Creators',
    url: '/creators'
  }, {
    name: 'Contact Us',
    url: '/contact'
  }, {
    name: 'Dashboard',
    url: '/dashboard'
  }, {
    name: 'Settings',
    url: '/settings'
  }
]

const useStyles = makeStyles((theme: Theme) =>
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
      color: "#717579",
    },
    loginButton: {
      lineHeight: "27px",
      fontSize: "18px",
      fontFamiliy: "Poppins",
      fontStyle: "normal",
      fontWeight: 700,
    }
  })
);

export const Navbar = () => {
  const classes = useStyles();

  // TODO implement context or redux
  const initialState = {};
  const [userInfo, setUserInfo] = useState(initialState);


  return (<div>
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar variant="dense">
          {/* Brand */}
          <Link to='/'>
            <IconButton edge="start" aria-label="logo" color="inherit">
              <BrandLogo />
            </IconButton>
          </Link>
          {/* Brand */}

          <Typography className={classes.title}></Typography>

          {paths.map((path, index) => (
            <Link to={path.url} className={classes.link} key={index}>
              <Typography variant="h5" className={classes.a}>
                {path.name}
              </Typography>
            </Link>
          ))}

          <Link to='/login' className={classes.link}>
            <ActionButton />
          </Link>

        </Toolbar>
      </Container>
    </AppBar>

  </div>);
}
