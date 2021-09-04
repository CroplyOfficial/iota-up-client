import {
  Card,
  makeStyles,
  createStyles,
  Typography,
  Button,
  Theme,
  Snackbar,
  SvgIcon,
} from "@material-ui/core";
import { Alert } from "../../../components/alert";
import { FavoriteSharp, Money, CalendarToday } from "@material-ui/icons";
import { Container } from "../../../components/container/container";
import { IProject } from "../../../interfaces/project.interface";
import { HeaderTags } from "./tags.header";
import { HeaderCardHeader } from "./cardHeader.header";
import { ProjectPageVariants } from "../../../interfaces/project.variants.interface";
import { ContributorPill } from "./contributor.pill";
import { ContributorCheckBox } from "./contributor.checkbox";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { getMyInfo } from "../../../actions/userActions";
import { userLoginReducer } from "../../../reducers/userReducers";
import axios from "axios";
import { DonateButton } from "../../../components/DonateButton/DonateButton";
import { useIsMobile } from "../../../utils/isMobile";
import { BARE_API, useFallbackImage } from "../../../config";
import { io } from "socket.io-client";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { ReactComponent as LikeDonate } from "../../../static/images/icons/likedonate.svg";
import { ReactComponent as UpVote } from "../../../static/images/icons/up.svg";

interface IProps {
  variant: ProjectPageVariants;
  project: IProject;
  showImageModal: () => void;
  onToggle: () => void;
  showUserProjectsModal: () => void;
}
export const ProjectHeader = (props: IProps) => {
  const { variant, project, showImageModal, onToggle, showUserProjectsModal } =
    props;
  const {
    _id,
    desc,
    name,
    wallet,
    media,
    backers,
    tags: initialTags,
    category,
    upvotes,
    author,
  } = project as IProject;
  const fallbackImage = useFallbackImage();
  const mainImage = media[0] || fallbackImage;
  const [tags, setTags] = useState<Array<string>>(initialTags || []);
  const [lookingForContributors, setLookingForContributors] = useState<boolean>(
    project.needContributors ?? false
  );
  const [upvotesCount, setUpvotesCount] = useState<number>(0);

  const onToggleCheckbox = () => {
    setLookingForContributors(!lookingForContributors);
  };
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    setUpvotesCount(upvotes);
  }, [upvotes]);

  const dispatch = useDispatch();
  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;
  //@ts-ignore
  const isProjectAuthor = userInfo?._id === project?.projectAuthor;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        paddingTop: "15px",
        paddingBottom: "15px",
        marginTop: "50px",
        minheight: "750px",
        display: "flex",
        borderRadius: "20px",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column-reverse",
        },
      },
      left: {
        maxWidth: "48.5%",
        padding: "30px",
        paddingRight: "20px",
        [theme.breakpoints.down("sm")]: {
          width: "calc(100% - 60px)",
          maxWidth: "unset",
        },
      },
      mainImageWrapper: {
        width: "100%",
        height: "425px",
        borderRadius: "20px",
        backgroundColor: "#f5f5f5",
        marginBottom: "20px",
        overflow: "hidden",
        [theme.breakpoints.down("sm")]: {
          height: "20%",
        },
      },
      imagesWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > div": {
          background: "#f5f5f5",
          width: "170px",
          height: "96px",
          marginRight: "25px",
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
          marginBottom: "20px",
        },

        "& > div:nth-child(1)": {
          borderRadius: "20px",
          backgroundSize: "100%",
        },
        "& > div:nth-child(2)": {
          borderRadius: "20px",
        },
        "& > div:nth-child(3)": {
          borderRadius: "20px",
        },
        "& > div:nth-child(4)": {
          borderRadius: "20px",
          marginRight: "0",
        },
        "& > div:nth-child(5)": {
          display: "none",
        },
      },
      right: {
        flexGrow: 55,
        padding: "30px",
        paddingLeft: "25px",
      },
      title: {
        fontFamily: "Poppins",
        fontWeight: 700,
        fontStyle: "normal",
        fontSize: "32px",
        lineHeight: "48px",
        paddingBottom: "20px",
      },
      description: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
      },
      buttons: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: "1rem",
        paddingTop: "45px",
      },
      button: {
        fontFamily: "Poppins",
        fontWeight: 700,
        fontStyle: "normal",
        fontSize: "18px",
        lineHeight: "27px",
        padding: "15px",
        paddingLeft: "45px",
        paddingRight: "45px",
        borderRadius: "10px",
        width: "282.18px",
      },
      statsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "75px",
        paddingBottom: "10px",
        flexWrap: "wrap",
      },
      stats: {
        display: "flex",
        flexDirection: "row",

        "& > div": {
          display: "flex",
          flexDirection: "column",
        },
      },
      statsHeader: {
        fontFamily: "Poppins",
        fontWeight: 800,
        fontStyle: "normal",
        fontSize: "24px",
        lineHeight: "36px",
        paddingBottom: "5px",
      },
      statsSubHeader: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
      },
      headerWrapper: {
        position: "relative",
      },
      statsIcon: {
        paddingRight: "1.5rem",
      },
      projectTagsHeader: {
        fontFamily: "Poppins",
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "24px",
        paddingBottom: "15px",
        paddingTop: "10px",
      },
      hr: {
        stroke: "3px solid green",
        border: "0.1px solid rgba(0,0,0,0.05)",
        marginBottom: "35px",
      },
      pills: {},
      tags: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        minWidth: "1000px",
        gap: "1rem",

        "& > *": {
          backgroundColor: "#E9E9E9",
          fontFamily: "Open Sans",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "16px",
          lineHeight: "28px",
        },
        [theme.breakpoints.down("sm")]: {
          minWidth: "unset",
          width: "100%",
        },
      },
      categories: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        maxWidth: "100%",
        gap: "1rem",

        "& > *": {
          backgroundColor: `${theme.palette.primary.main}4D`,
          fontFamily: "Open Sans",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "16px",
          lineHeight: "28px",
        },
        paddingBottom: "1rem",
      },

      objectFill: {
        objectFit: "cover",
        width: "100%",
        height: "100%",
      },
      editButton: {
        display: "flex",
        flexDirection: "row-reverse",
      },
    })
  );

  const classes = useStyles();

  const myInfoMeta = useSelector((state: RootState) => state.myInfo);
  const { myInfo }: any = myInfoMeta;
  const [showError, setShowError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<string>("");

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setShowError("");
  };
  const handleCloseSuccess = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccess("");
  };

  const handleUpvotes = async () => {
    if (!userInfo?.token) {
      return setShowError("You are not logged in!");
    }
    const config = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/projects/${_id}/toggle-upvote`,
      config
    );
    const isProjectUpvoted = data.includes(_id);
    setIsLiked(isProjectUpvoted);
    console.log(data);
    if (isProjectUpvoted) {
      setUpvotesCount(upvotesCount + 1);
      setShowSuccess("UP voted Project!");
    } else {
      setUpvotesCount(upvotesCount - 1);
      setShowSuccess("Removed UP Vote!");
    }
  };

  const socket = io(BARE_API);

  const contactCreator = async () => {
    console.log(author);
    socket.emit("startChat", {
      // @ts-ignore
      partner: author?.id,
      token: userInfo?.token,
    });
  };

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);

  useEffect(() => {
    if (myInfo) {
      setIsLiked(myInfo?.upvotedProjects?.includes(_id));
    }
  }, [myInfo, _id]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const isMobile = useIsMobile();

  return (
    <>
      {isOpen && (
        <Lightbox
          mainSrc={media[photoIndex]}
          nextSrc={media[(photoIndex + 1) % media.length]}
          prevSrc={media[(photoIndex + media.length - 1) % media.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => {
            setPhotoIndex((photoIndex + media.length - 1) % media.length);
          }}
          onMoveNextRequest={() => {
            setPhotoIndex((photoIndex + 1) % media.length);
          }}
        />
      )}
      <Snackbar
        open={showError.length ? true : false}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {showError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccess.length ? true : false}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {showSuccess}
        </Alert>
      </Snackbar>
      <Container maxWidth={isMobile ? "xl" : "sm"}>
        <Card className={classes.root}>
          <div className={classes.left}>
            <div
              className={classes.mainImageWrapper}
              /* onClick={() => showImageModal()} */
            >
              <img
                src={mainImage}
                onClick={() => setIsOpen(true)}
                className={classes.objectFill}
              />
            </div>
            <div className={classes.imagesWrapper}>
              {media.slice(1, media.length).map((image, i) => (
                <div
                  className={"image-" + i++}
                  /*  onClick={showImageModal} */
                >
                  <img
                    src={image}
                    className={classes.objectFill}
                    onClick={() => setIsOpen(true)}
                  />
                </div>
              ))}
            </div>
            <Typography className={classes.projectTagsHeader}>
              Project Tags:
            </Typography>
            <div className={classes.pills}>
              <span>
                <HeaderTags
                  tags={category}
                  variant={variant}
                  className={classes.categories}
                />
                <HeaderTags
                  tags={project.tags}
                  variant={variant}
                  className={classes.tags}
                />
              </span>
            </div>
          </div>
          <div className={classes.right}>
            <HeaderCardHeader
              project={project}
              handleUpvotes={handleUpvotes}
              isLiked={isLiked}
              showUserProjectsModal={showUserProjectsModal}
            />
            <ContributorPill project={project} />
            {/* <ContributorPill project={project} /> 
 <ContributorCheckBox
            project={project}
            checked={lookingForContributors}
            onChange={onToggleCheckbox}
          />

          */}
            <Typography variant="h2" className={classes.title}>
              {name}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              className={classes.description}
            >
              {desc}
            </Typography>
            <div className={classes.statsWrapper}>
              <div className={classes.stats}>
                <SvgIcon className={classes.statsIcon} fontSize="large">
                  <UpVote />
                </SvgIcon>
                <div>
                  <div className={classes.headerWrapper}>
                    <Typography variant="h4" className={classes.statsHeader}>
                      {upvotesCount}
                    </Typography>
                  </div>
                  <Typography variant="h4" className={classes.statsSubHeader}>
                    UP Votes
                  </Typography>
                </div>
              </div>
              <div className={classes.stats}>
                <SvgIcon className={classes.statsIcon} fontSize="large">
                  <LikeDonate />
                </SvgIcon>
                <div>
                  <Typography variant="h4" className={classes.statsHeader}>
                    {backers}
                  </Typography>
                  <Typography variant="h4" className={classes.statsSubHeader}>
                    Donations
                  </Typography>
                </div>
              </div>

              <div className={classes.buttons}>
                <DonateButton
                  wallet={wallet}
                  text="DONATE"
                  recipientName={name}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    style={{ border: "none", color: "white" }}
                  >
                    Donate Now
                    <FavoriteSharp />
                  </Button>
                </DonateButton>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={contactCreator}
                >
                  Contact Creator
                </Button>
              </div>
            </div>
            <hr className={classes.hr} />
            {isProjectAuthor ? (
              <div className={classes.editButton}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={onToggle}
                >
                  Edit Project
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </Card>
      </Container>
    </>
  );
};
