import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  TextField,
  Theme,
  FormHelperText,
  FormControl,
} from "@material-ui/core";
import { IPost } from "../../interfaces/post.interface";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { CloseSharp } from "@material-ui/icons";
import { IProject } from "../../interfaces/project.interface";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
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
    label: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      color: theme.palette.text.secondary,
      paddingTop: "10px",
    },
    hint: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "12px",
      lineHeight: "28px",
      color: theme.palette.text.hint,
    },
    textField: {
      width: "300px",
    },
    featuredImage: {
      width: "400px",
      height: "225px",
    },
    featuredImageMissing: {
      width: "400px",
      height: "225px",
      border: "3px solid grey",
    },
    images: {
      display: "flex",
      width: "100%",
      flexWrap: "wrap",
      gap: "15px",
    },
    image: {
      width: "200px",
      height: "200px",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
    },
    imageMissing: {
      width: "200px",
      height: "200px",
      border: "3px solid grey",
    },
    level: {
      display: "flex",
      justifyContent: "space-between",
      gap: "50px",
    },
    left: {
      display: "flex",
      flexDirection: "column",
    },
    right: {
      display: "flex",
      flexDirection: "column",
      width: "450px",
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
  const [featuredImage, setFeaturedImage] = useState<string>(
    project?.images[0] ?? ""
  );
  const [images, setImages] = useState<string[]>(project?.images ?? []);

  const handleUrlOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };
  const handleSave = () => {
    onClick();
  };

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
            <div className={classes.level}>
              <div className={classes.left}>
                <Typography className={classes.label}>Video</Typography>
                {url.length < 8 ||
                ["youtube.", "vimeo."].some((domain) =>
                  url.includes(domain)
                ) ? (
                  <TextField
                    label="Video Url"
                    className={classes.textField}
                    onChange={handleUrlOnChange}
                  />
                ) : (
                  <TextField
                    error
                    label="Video Url"
                    className={classes.textField}
                    helperText={"Only youtube.com or vimeo.com urls."}
                    onChange={handleUrlOnChange}
                  />
                )}
                <Typography className={classes.label}>Main Image</Typography>
                <Button
                  onClick={handlePrimaryImage}
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  Set Featured Image
                </Button>
                <Typography className={classes.label}>
                  Secondary Images
                </Typography>
                <Button
                  onClick={handleSecondaryImages}
                  color="secondary"
                  className={classes.button}
                  variant="outlined"
                >
                  Add other images
                </Button>
              </div>
              <div className={classes.right}>
                {featuredImage && (
                  <>
                    <Typography className={classes.label}>
                      Featured Image
                    </Typography>
                    <img
                      src={featuredImage}
                      className={classes.featuredImage}
                    />
                  </>
                )}

                {images.length ? (
                  <>
                    <Typography className={classes.label}>
                      Secondary Images
                    </Typography>
                    <div className={classes.images}>
                      {images.map((i) => (
                        <img src={i} className={classes.image} />
                      ))}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className={classes.footer}>
            <Button
              onClick={handleSave}
              color="primary"
              className={classes.button}
              variant="contained"
              style={{ margin: "15px" }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};