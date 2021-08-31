import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  TextField,
  Theme,
} from "@material-ui/core";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { CloseSharp } from "@material-ui/icons";
import { useState } from "react";
import draftToHtml from "draftjs-to-html";
import { IProject } from "../../interfaces/project.interface";
import { useSelector } from "react-redux";
import axios from "axios";
import { getProject } from "../../actions/projectsActions";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 2,
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    card: {
      width: "60%",
      backgroundColor: "#ffffff",
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
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        padding: "0px",
      }
    },
    header: {
      display: "flex",
      justifyContent: "start",
      height: "30px",
      padding: "15px",
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
      transform: "translate(-25px,10px)",
      [theme.breakpoints.down("sm")]: {
        transform: "translate(-0px,10px)",
      }
    },
    body: {
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
      [theme.breakpoints.down("sm")]: {
        marginRight: "15px",
        marginBottom: "15px",
      }
    },
    textField: {
      paddingBottom: "15px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      }
    },
  })
);

interface IProps {
  project: IProject;
  onClick: () => void;
}
export const ProjectCreatePostModal = (props: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { onClick } = props;
  const [title, setTitle] = useState<string>("");
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;

  const toolBar = {
    image: {
      uploadEnabled: true,
      inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
      urlEnabled: false,
      uploadCallback: async function (...params: any[]) {
        console.log(params);
        return {
          data: {
            link: "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80",
          },
        };
      },
    },
  };

  const handleCreatePost = async () => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(
      `/api/posts/by-project/${props.project._id}`,
      {
        title,
        body: html,
      },
      config
    );
    dispatch(getProject(props.project._id));
    onClick();
  };

  return (
    <div>
      <div className={classes.modal}>
        <div className={classes.background} onClick={onClick}></div>
        <div className={classes.card}>
          <div className={classes.header}>
            <Typography className={classes.title}> Create A Post</Typography>
            <Button onClick={onClick} className={classes.justifyEnd}>
              <CloseSharp />
            </Button>
          </div>
          <div className={classes.body}>
            <TextField
              value={title}
              onChange={handleChangeTitle}
              label="Title"
              className={classes.textField}
            />
            <Typography className={classes.title}> </Typography>
            <Editor
              editorState={editorState}
              toolbar={toolBar}
              onEditorStateChange={onEditorStateChange}
            />
            <Typography color="textPrimary"></Typography>
          </div>
          <div className={classes.footer}>
            <Button
              onClick={handleCreatePost}
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
