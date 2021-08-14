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
import {
  Flag,
  ArrowUpward,
  Share,
  Clear,
  DeleteForever,
} from "@material-ui/icons";
import { IProject } from "../../../interfaces/project.interface";
import { ReactComponent as UpButton } from "../../../static/images/icons/up.svg";
import { UserProjectsModal } from "../../../components/modals/UserProjectsModal";
import { useState, useEffect } from "react";
import { RWebShare } from "react-web-share";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { VerifyDeleteProjectModal } from "../../../components/modals/verifyDeleteProjectModal";

interface IProps {
  project: IProject;
  handleUpvotes?: () => void;
  isLiked: boolean;
  showUserProjectsModal: () => void;
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
      cursor: "pointer",
    },
    subHeader: {
      fontFamily: "Open Sans",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "19px",
      color: theme.palette.primary.main,
      paddingRight: "20px",
      cursor: "pointer",
    },
    subHeader2: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "19px",
      cursor: "pointer",
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
      cursor: "pointer",
    },
    action: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "100%",
      paddingTop: "8px",
      zIndex: 2,
    },
  })
);
export const HeaderCardHeader = (props: IProps) => {
  const classes = useStyles();
  const { project, handleUpvotes, isLiked, showUserProjectsModal } = props;

  const media = project.media;
  const fallbackImage = "";
  const mainImage = media[0] || fallbackImage;
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (e: any) => {
    console.log(e.target, e.currentTarget);
    setShowModal(!showModal);
  };

  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;
  //@ts-ignore
  const isProjectAuthor = userInfo?._id === project?.projectAuthor;

  const [showingDeleteModal, setShowingDeleteModal] = useState<boolean>(false);
  const toggleShowDeleteModal = () => {
    setShowingDeleteModal(!showingDeleteModal);
  };

  return (
    <>
      {showingDeleteModal && (
        <VerifyDeleteProjectModal
          onClick={toggleShowDeleteModal}
          project={project}
        />
      )}
      <CardHeader
        className={classes.root}
        avatar={
          <Avatar
            src={project.author && project.author.avatar}
            className={classes.avatar}
            alt={project.author && project.author.displayName}
            onClick={showUserProjectsModal}
          ></Avatar>
        }
        title={
          <span className={classes.header} onClick={showUserProjectsModal}>
            {project.author && project.author.displayName}
          </span>
        }
        subheader={
          <span onClick={showUserProjectsModal}>
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
            {isProjectAuthor ? (
              <IconButton>
                <DeleteForever
                  fontSize="large"
                  color="disabled"
                  onClick={toggleShowDeleteModal}
                />
              </IconButton>
            ) : (
              <IconButton>
                <Flag fontSize="large" color="disabled" />
              </IconButton>
            )}
            <IconButton>
              <RWebShare
                data={{
                  text: `Checkout this project on the UP! It's called ${project.name}. I think you'll like it!`,
                  url: window.location.href,
                  title: "Share this project on the UP.",
                }}
                onClick={() => console.log("shared it")}
              >
                <Share fontSize="large" color="disabled" />
              </RWebShare>
            </IconButton>
            <IconButton onClick={handleUpvotes}>
              {/* <ArrowUpward fontSize="large" color="primary" /> */}
              <SvgIcon
                fontSize="large"
                color={isLiked ? "primary" : "disabled"}
              >
                <UpButton />
              </SvgIcon>
            </IconButton>
          </div>
        }
      />
    </>
  );
};
