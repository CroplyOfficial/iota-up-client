import {
  createStyles,
  makeStyles,
  TextareaAutosize,
  Theme,
} from "@material-ui/core";
import {
  ProjectPageVariants,
  ProjectVariants,
} from "../../../interfaces/project.variants.interface";
import { IProject } from "../../../interfaces/project.interface";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useState } from "react";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
  project: IProject | Record<never, never>;
}

export const ProjectBodyInformation = (props: IProps) => {
  const { project, variant } = props;
  const { information } = project as IProject;
  const [editorState, setEditorState] = useState<EditorState>(
    information as any
  );
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
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
          }}
        />
        <textarea
          disabled
          value={
            editorState
              ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
              : ""
          }
        />
      </div>
    </div>
  );
};
