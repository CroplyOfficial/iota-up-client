import { createStyles, makeStyles, Typography, Theme } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  BodyOption,
  BodyOptions,
} from "../../interfaces/project.bodyOptions.intercace";
import { IProject } from "../../interfaces/project.interface";

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
      padding: "15px",
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
    justifyEnd: {
      marginLeft: "auto",
      paddingRight: "15px",
    },
  })
);

interface IProps {
  option: BodyOption;
  onClick: (options: BodyOption) => void;
  project: IProject;
  showCreatePostModal?: () => void;
}
export const ProjectNavbar = (props: IProps) => {
  const { option, onClick, project, showCreatePostModal } = props;
  const classes = useStyles();
  const isInformation = option === BodyOptions.INFORMATION;
  const isUpdates = option === BodyOptions.UPDATES;

  const selectedUser = useSelector((state: RootState) => state.userLogin);
  //@ts-ignore
  const userInfo = selectedUser.userInfo;
  const isOwner = userInfo?._id === project?.projectAuthor;

  return (
    <div className={classes.root}>
      <Typography
        className={isInformation ? classes.active : classes.link}
        onClick={() => onClick(BodyOptions.INFORMATION)}
      >
        Project Information
      </Typography>
      <Typography
        className={isUpdates ? classes.active : classes.link}
        onClick={() => onClick(BodyOptions.UPDATES)}
      >
        Updates
      </Typography>
      {isUpdates && isOwner ? (
        <Typography
          className={`${classes.link} ${classes.justifyEnd}`}
          onClick={showCreatePostModal}
        >
          Add
        </Typography>
      ) : (
        ""
      )}
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
