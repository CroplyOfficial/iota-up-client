import { createStyles, makeStyles, Button } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React, { useState } from "react";

interface ISignInButton {
  variant?: "outlined" | "contained";
  toggleLoginModal: () => void;
}
const SignInButton = (props: ISignInButton) => {
  const isSecondary = props.variant === "contained";
  const useStyles = makeStyles(() =>
    createStyles({
      button: {
        lineHeight: "27px",
        fontSize: "18px",
        font: "Poppins",
        fontWeight: 700,
        fontStyle: "normal",
        color: isSecondary ? "white" : "",
      },
    })
  );

  const classes = useStyles();
  return (
    <Button
      variant={props.variant ?? "outlined"}
      className={classes.button}
      color="secondary"
      disableElevation
      startIcon={<Person />}
      onClick={props.toggleLoginModal}
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
      {userInfo.name ? (
        "hello anonymous"
      ) : (
        <SignInButton
          variant={variant}
          toggleLoginModal={props.toggleLoginModal}
        />
      )}
    </React.Fragment>
  );
};
