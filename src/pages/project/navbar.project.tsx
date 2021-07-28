import { createStyles, makeStyles, Typography, Theme } from "@material-ui/core";
import { useState } from "react";
import {
  BodyOption,
  BodyOptions,
} from "../../interfaces/project.bodyOptions.intercace";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "25px",
      transition: "0.3s ease-out color",
      width: "100%",
      height: "3rem",
    },
    active: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontSize: "32px",
      lineHeight: "48px",
      fontStyle: "normal",
      color: theme.palette.text.primary,
      width: "auto",
    },
    link: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "30px",
      fontStyle: "normal",
      color: theme.palette.text.secondary,
      width: "auto",
    },
  })
);

interface IProps {
  option: BodyOption;
  onClick: (options: BodyOption) => void;
}
export const ProjectNavbar = (props: IProps) => {
  const { option, onClick } = props;
  const classes = useStyles();
  const isInformation = option === BodyOptions.INFORMATION;
  const isUpdates = option === BodyOptions.UPDATES;
  return (
    <div className={classes.root}>
      <Typography
        className={isInformation ? classes.active : classes.active}
        onClick={() => onClick(BodyOptions.INFORMATION)}
      >
        Project Information
      </Typography>
      <Typography
        className={isUpdates ? classes.link : classes.link}
        onClick={() => onClick(BodyOptions.UPDATES)}
      >
        Updates
      </Typography>
      {/*
      <Typography className={isInformation ? classes.active : classes.link}>
        Polls
      </Typography>
      <Typography className={isInformation ? classes.active : classes.link}>
        FAQS
      </Typography>
        */}
    </div>
  );
};
