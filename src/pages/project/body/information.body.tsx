import {
  createStyles,
  makeStyles,
  TextareaAutosize,
  Theme,
  Button,
} from "@material-ui/core";
import {
  ProjectPageVariants,
  ProjectVariants,
} from "../../../interfaces/project.variants.interface";
import { IProject } from "../../../interfaces/project.interface";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useState } from "react";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { uploadFile } from "../../../utils/handleFileUpload";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { padding: "20px" },
    text: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "26px",
      fontStyle: "normal",
      color: theme.palette.text.primary,
    },
  })
);

interface IProps {
  variant: ProjectPageVariants;
  project: IProject;
  isEditing: boolean;
  toggleIsEditing: () => void;
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

export const ProjectBodyInformation = (props: IProps) => {
  const {
    project,
    variant,
    isEditing,
    toggleIsEditing,
    editorState,
    onEditorStateChange,
  } = props;
  const { desc } = project as IProject;

  const classes = useStyles();

  const selectedUser = useSelector((state: RootState) => state.userLogin);
  //@ts-ignore
  const userInfo = selectedUser.userInfo;
  const isOwner = userInfo?._id === project?.projectAuthor;

  const toolBar = {
    image: {
      uploadEnabled: true,
      inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
      urlEnabled: false,
      uploadCallback: async function (...params: any[]) {
        const link = await uploadFile(params[0], userInfo.token);
        return {
          data: {
            link,
          },
        };
      },
    },
  };

  return (
    <div className={classes.root}>
      <div>
        {isOwner ? (
          <>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
              toolbar={toolBar}
              {...(!isEditing ? { toolbarHidden: true } : {})}
              readOnly={!isEditing}
              toolbarClassName={"editor-toolbar"}
            />
          </>
        ) : (
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
            readOnly={true}
            toolbarHidden
          />
        )}
      </div>
    </div>
  );
};
