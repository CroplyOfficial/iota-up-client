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
import {BrandLogo} from "../../static/icons/brand-logo";

const paths = {
  root: "/",
  howItWorks: "/",
  projects: "/",
  creators: "/",
  contactUs: "/",
  dashboard: "/",
  settings: "/",
};

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
  return (<div>
  <AppBar position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar variant="dense">
            {/* Brand */}
            <IconButton edge="start" aria-label="logo" color="inherit">
              <BrandLogo />
            </IconButton>
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
            <Link to={paths.root} className={classes.link}>
              <Button
                variant="outlined"
                className={classes.loginButton}
                color="primary"
                disableElevation
                startIcon={<Person />}
              >
                Sign in
              </Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>

    </div>);
}
