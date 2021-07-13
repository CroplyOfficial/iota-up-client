import { createStyles, makeStyles, Button } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      lineHeight: "27px",
      fontSize: "18px",
      font: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
    },
  })
);

interface ISignInButton {
  variant?: "outlined" | "contained";
}
const SignInButton = (props: ISignInButton) => {
  const classes = useStyles();
  return (
    <Button
      variant={props.variant ?? "outlined"}
      className={classes.button}
      color="secondary"
      disableElevation
      startIcon={<Person />}
    >
      Sign in
    </Button>
  );
};

export const ActionButton = (props: ISignInButton) => {
  const { variant } = props;
  const initialState = {};
  const [userInfo, setUserInfo] = useState<Record<string, any>>(initialState);

  return (
    <React.Fragment>
      {userInfo.name ? "hello anonymous" : <SignInButton variant={variant} />}
    </React.Fragment>
  );
};
