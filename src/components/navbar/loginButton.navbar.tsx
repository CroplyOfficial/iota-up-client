import { Link } from "react-router-dom";
import {createStyles, makeStyles, Button } from "@material-ui/core";
import {Person} from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles(() => createStyles({
  button: {
    lineHeight: "27px",
    fontSize: "18px",
    font: "Poppins",
    fontWeight: 700,
    fontStyle: "normal"
    
  }
}));

const SignInButton = () => {
  const classes = useStyles();
  return (
              <Button
                variant="outlined"
                className={classes.button}
                color="primary"
                disableElevation
                startIcon={<Person />}
              >
                Sign in
              </Button>
  )
}

export const ActionButton = () => {
  const initialState = {};
  const [userInfo, setUserInfo] = useState<Record<string, any>>(initialState);

  return (<React.Fragment> 
    {userInfo.name ? "hello pete" : <SignInButton />}
    </React.Fragment>);
}

