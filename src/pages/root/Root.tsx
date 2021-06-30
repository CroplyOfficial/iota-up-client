import React from "react";
import "../../static/css/root/root.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";

import { BrandLogo } from "../../static/icons/brand-logo";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Root = () => {
  const initialState = {
    paths: {
      root: "/",
      howItWorks: "/",
      projects: "/",
      creators: "/",
      contactUs: "/",
      dashboard: "/",
      settings: "/",
    },
  };
  const [state, setState] = useState(initialState);
  const { paths } = state;

  const style = { textDecoration: "none", color: "inherit" };
  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense">
          {/* Brand */}
          <IconButton edge="start" aria-label="logo" color="inherit">
            <BrandLogo />
          </IconButton>
          {/* Brand */}

          <Link to={paths.root} style={style}>
            <Typography variant="h6">Home</Typography>
          </Link>
          <Link to={paths.howItWorks} style={style}>
            <Typography variant="h6">How It Works</Typography>
          </Link>
          <Link to={paths.projects} style={style}>
            <Typography variant="h6">Projects</Typography>
          </Link>
          <Link to={paths.creators} style={style}>
            <Typography variant="h6">Creators</Typography>
          </Link>
          <Link to={paths.contactUs} style={style}>
            <Typography variant="h6">Contact Us</Typography>
          </Link>
          <Link to={paths.root} style={style}>
            <Button color="primary">Sign in</Button>
            {/* <Typography variant="h6">Sign In</Typography> */}
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
