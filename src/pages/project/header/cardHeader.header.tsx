import {
  CardHeader,
  Typography,
  IconButton,
  makeStyles,
  createStyles,
  Avatar,
  Theme,
  SvgIcon,
  Menu,
  MenuItem,
  MenuProps,
  withStyles,
  ListItemIcon,
  Snackbar,
  ListItemText,
} from "@material-ui/core";
import {
  Flag,
  ArrowUpward,
  Share,
  Clear,
  DeleteForever,
  MoreVert,
} from "@material-ui/icons";
import { IProject } from "../../../interfaces/project.interface";
import { ReactComponent as UpButton } from "../../../static/images/icons/up.svg";
import { UserProjectsModal } from "../../../components/modals/UserProjectsModal";
import { useState, useEffect } from "react";
import { RWebShare } from "react-web-share";
import { Alert } from "../../../components/alert";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { VerifyDeleteProjectModal } from "../../../components/modals/verifyDeleteProjectModal";
import { useIsMobile } from "../../../utils/isMobile";
import axios from "axios";

interface IProps {
  project: IProject;
  handleUpvotes?: () => void;
  isLiked: boolean;
  showUserProjectsModal: () => void;
}

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme: Theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      height: "60px",
      paddingBottom: "35px",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        height: "40px",
      },
    },
    headerWrapper: {},
    header: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
        lineHeight: "1.43",
      },
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
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
        lineHeight: "1.43",
      },
    },

    subHeader2: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "19px",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
        lineHeight: "1.43",
        display: "none",
      },
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
      [theme.breakpoints.down("sm")]: {
        height: "40px",
        width: "40px",
      },
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: any | React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
  const [showError, setShowError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<string>("");

  const handleFlagProject = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .get(`/api/projects/flag/${project._id}`, config)
      .then(() => {
        setShowSuccess("Project Reported!");
      })
      .catch((error) => {
        setShowError(error.response.data.message);
      });
  };

  const handleCloseSnack = () => {
    setShowError("");
    setShowSuccess("");
  };

  const [showingDeleteModal, setShowingDeleteModal] = useState<boolean>(false);
  const toggleShowDeleteModal = () => {
    setShowingDeleteModal(!showingDeleteModal);
  };
  const isMobile = useIsMobile();
  return (
    <>
      {showingDeleteModal && (
        <VerifyDeleteProjectModal
          onClick={toggleShowDeleteModal}
          project={project}
        />
      )}
      <Snackbar
        open={showError.length ? true : false}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="error">
          {showError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccess.length ? true : false}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          {showSuccess}
        </Alert>
      </Snackbar>
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
            {isMobile ? (
              <>
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
                <StyledMenu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      if (isProjectAuthor) {
                        toggleShowDeleteModal();
                      } else {
                        // TODO flag
                      }
                    }}
                  >
                    <ListItemIcon>
                      {isProjectAuthor ? (
                        <DeleteForever color="disabled" />
                      ) : (
                        <Flag color="disabled" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={!isProjectAuthor ? "Flag" : "Delete"}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <RWebShare
                        data={{
                          text: `Checkout this project on the UP! It's called ${project.name}. I think you'll like it!`,
                          url: window.location.href,
                          title: "Share this project on the UP.",
                        }}
                        onClick={() =>
                          console.log(document.querySelectorAll(".rwebshare"))
                        }
                        className="rwebshare"
                      >
                        <Share color="disabled" />
                      </RWebShare>
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      //@ts-ignore
                      handleUpvotes();
                    }}
                  >
                    <ListItemIcon>
                      <SvgIcon color={isLiked ? "primary" : "disabled"}>
                        <UpButton />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText
                      primary={isLiked ? "Remove Vote" : "UP Vote"}
                    />
                  </MenuItem>
                </StyledMenu>
              </>
            ) : (
              <>
                {isProjectAuthor ? (
                  <IconButton>
                    <DeleteForever
                      fontSize="large"
                      color="disabled"
                      onClick={toggleShowDeleteModal}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleFlagProject}>
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
              </>
            )}
          </div>
        }
      />
    </>
  );
};
