import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  Theme,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { IPost } from "../../interfaces/post.interface";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import {
  MoreVert,
  Menu as MenuIcon,
  CloseSharp,
  Save,
} from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import draftToHtml from "draftjs-to-html";
import { IProject } from "../../interfaces/project.interface";
import { uploadFile } from "../../utils/handleFileUpload";

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
      height: "80vh",
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        padding: "0px",
      },
    },
    header: {
      display: "flex",
      justifyContent: "start",
      height: "30px",
      paddingBottom: "15px",
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
        transform: "translate(0px,10px)",
      },
    },
    body: {
      height: "100%",
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
    },
  })
);

interface IProps {
  post: IPost;
  project: IProject;
  onClick: () => void;
}
export const ProjectPostModal = (props: IProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const classes = useStyles();
  const { post, onClick, project } = props;

  const blocksFromHtml = htmlToDraft(post.body);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const initialEditorState = EditorState.createWithContent(contentState);

  const userLoginMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userLoginMeta;

  const handleDeletePost = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/posts/modify/${post._id}`, config);
    window.location.reload();
  };

  const isOwner = String(userInfo?._id) === String(project?.author?.id);

  const handleEditPost = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const editedPost = await axios.post(
      `/api/posts/modify/${post._id}`,
      {
        body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      },
      config
    );
    setEditing(false);
  };
  const [editorState, setEditorState] =
    useState<EditorState>(initialEditorState);
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const toolBar = {
    image: {
      uploadEnabled: true,
      inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
      urlEnabled: false,
      uploadCallback: async function (...params: any[]) {
        const link = await uploadFile(params[0], userInfo.token);
        return {
          data: {
            link: "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80",
          },
        };
      },
    },
  };
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className={classes.modal}>
        <div className={classes.background} onClick={onClick}></div>
        <div className={classes.card}>
          <div className={classes.header}>
            {editing && (
              <Button onClick={handleEditPost}>
                <Save color="primary" />
              </Button>
            )}
            {isOwner && (
              <>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "3px",
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  <MenuItem
                    onClick={(e: any) => {
                      setEditing(true);
                      setAnchorEl(null);
                    }}
                  >
                    Edit Post
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDeletePost();
                      setAnchorEl(null);
                    }}
                  >
                    Delete Post
                  </MenuItem>
                </Menu>
              </>
            )}
            <Button onClick={onClick} className={classes.justifyEnd}>
              <CloseSharp />
            </Button>
          </div>
          <div className={classes.body}>
            <Typography className={classes.title}> {post.title} </Typography>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
              toolbar={toolBar}
              {...(!editing ? { toolbarHidden: true } : {})}
              readOnly={!editing}
              toolbarClassName={"editor-toolbar"}
            />
            <Typography color="textPrimary"></Typography>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </div>
  );
};
