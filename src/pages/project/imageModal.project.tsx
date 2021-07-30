import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { IPost } from "../../interfaces/post.interface";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { CloseSharp } from "@material-ui/icons";
import { IProject } from "../../interfaces/project.interface";
import { useState } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "fixed",
      zIndex: 2,
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    card: {
      width: "60%",
      backgroundColor: "#f5f5f5",
      zIndex: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      borderRadius: "15px",
      paddingLeft: "25px",
      paddingRight: "25px",
      paddingBottom: "10px",
      paddingTop: "10px",
    },
    header: {
      display: "flex",
      justifyContent: "start",
      height: "30px",
      paddingBottom: "15px",
      paddingTop: "15px",
    },
    title: {
      fontSize: "32px",
      lineHeight: "48px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
    },
    justifyEnd: {
      position: "absolute",
      top: 0,
      right: 0,
      transform: "translate(0px,10px)",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      height: "70%",
      fontSize: "15px",
      lineHeight: "28px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      minHeight: "300px",
      maxHeight: "600px",
      padding: "15px",
      overflowX: "hidden",
      wordWrap: "break-word",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "0.4em",
        height: "50%",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    },
    footer: {
      display: "flex",
      width: "100%",
      flexDirection: "row-reverse",
      gap: "25px",
    },
    button: {
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      padding: "10px",
      paddingLeft: "30px",
      paddingRight: "30px",
      borderRadius: "10px",
      width: "300px",
    },
    label: {},
    textField: {
      width: "300px",
    },
    featuredImage: {
      width: "100%",
      height: "500px",
    },
    images: {
      display: "flex",
      flexDirection: "row",
    },
    image: {
      width: "200px",
      height: "200px",
    },
  })
);

interface IProps {
  project?: IProject;
  onClick: () => void;
}
export const ProjectImageModal = (props: IProps) => {
  const classes = useStyles();
  const { onClick, project } = props;
  const [url, setUrl] = useState<string>("");
  const [featuredImage, setFeaturedImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const handlePrimaryImage = () => {};
  const handleSecondaryImages = () => {};

  return (
    <div>
      <div className={classes.modal}>
        <div className={classes.background} onClick={onClick}></div>
        <div className={classes.card}>
          <div className={classes.header}>
            <Typography className={classes.title}>{project?.title}</Typography>
            <Button onClick={onClick} className={classes.justifyEnd}>
              <CloseSharp />
            </Button>
          </div>
          <div className={classes.body}>
            <TextField label="Video Url" className={classes.textField} />
            <Typography color="textPrimary" className={classes.label}>
              Only youtube.com or vimeo.com urls.
            </Typography>
            <div className={classes.images}>
              {featuredImage && (
                <img src={featuredImage} className={classes.featuredImage} />
              )}
            </div>
            <Button
              onClick={handlePrimaryImage}
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Set Featured Image
            </Button>

            <div className={classes.images}>
              {images.length
                ? images.map((i) => <img src={i} className={classes.image} />)
                : ""}
            </div>
            <Button
              onClick={handleSecondaryImages}
              color="secondary"
              className={classes.button}
              variant="outlined"
            >
              Add other images
            </Button>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </div>
  );
};
