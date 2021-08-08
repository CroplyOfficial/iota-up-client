import {
  CardHeader,
  Typography,
  IconButton,
  makeStyles,
  createStyles,
  Avatar,
  Theme,
  SvgIcon,
} from "@material-ui/core";
import { Flag, ArrowUpward, Share } from "@material-ui/icons";
import { IProject } from "../../../interfaces/project.interface";
import { ReactComponent as UpButton } from "../../../static/images/icons/up.svg";

import { useState, useEffect } from "react";

interface IProps {
  project: IProject;
  handleUpvotes?: () => void;
  isLiked: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      height: "60px",
      paddingBottom: "35px",
    },
    headerWrapper: {},
    header: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
    },
    subHeader: {
      fontFamily: "Open Sans",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "19px",
      color: theme.palette.primary.main,
      paddingRight: "20px",
    },
    subHeader2: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "19px",
    },
    subHeaderWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    ul: {},
    li: {},
    avatar: {
      width: "60px",
      height: "60px",
      backgroundColor: "orange",
    },
    action: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "100%",
      paddingTop: "8px",
    },
  })
);
export const HeaderCardHeader = (props: IProps) => {
  const classes = useStyles();
  const { project, handleUpvotes, isLiked } = props;

  const media = project.media;
  const fallbackImage = "";
  const mainImage = media[0] || fallbackImage;
  return (
    <CardHeader
      className={classes.root}
      avatar={
        <Avatar
          src={project.author && project.author.avatar}
          className={classes.avatar}
          alt={project.author && project.author.fullName}
        ></Avatar>
      }
      title={
        <span className={classes.header}>
          {project.author && project.author.fullName}
        </span>
      }
      subheader={
        <span>
          <span className={classes.subHeader}>
            {" "}
            {`${
              project.author &&
              project.author.projects &&
              project.author.projects.length
            } Projects`}
          </span>
          <span className={classes.subHeader2}>
            &bull;{" "}
            {`${project.author && project.author.city}, ${
              project.author && project.author.country
            }`}
          </span>
        </span>
      }
      action={
        <div className={classes.action}>
          <IconButton>
            <Flag fontSize="large" />
          </IconButton>
          <IconButton>
            <Share fontSize="large" />
          </IconButton>
          <IconButton>
            {/* <ArrowUpward fontSize="large" color="primary" /> */}
            <SvgIcon fontSize="large" color={isLiked ? "primary" : "disabled"}>
              <UpButton onClick={handleUpvotes} />
            </SvgIcon>
          </IconButton>
        </div>
      }
    />
  );
};
