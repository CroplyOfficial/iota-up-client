import { createStyles, makeStyles, Button } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AvatarDropDown } from "./avatarDropDown.navbar";

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
  const selectedUser = useSelector((root: RootState) => root.userLogin);
  const userInfo = (selectedUser as any).userInfo;

  return (
    <React.Fragment>
      {userInfo?.firstName ? (
        <AvatarDropDown userInfo={userInfo} />
      ) : (
        <SignInButton
          variant={variant}
          toggleLoginModal={props.toggleLoginModal}
        />
      )}
    </React.Fragment>
  );
};
