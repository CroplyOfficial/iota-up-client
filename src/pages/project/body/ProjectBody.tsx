import { createStyles, makeStyles } from "@material-ui/core";
import { Container } from "../../../components/container/container";
import { IProject } from "../../../interfaces/project.interface";
import { ProjectPageVariants } from "../../../interfaces/project.variants.interface";
import { useState } from "react";
import { ProjectBodyInformation } from "./information.body";
import { ProjectBodyUpdates } from "./updates.body";
import {
  BodyOption,
  BodyOptions,
} from "../../../interfaces/project.bodyOptions.intercace";
import { ProjectNavbar } from "../navbar.project";
import { CreateProjectCard } from "../../../components/card/card.createProject";
import { IPost } from "../../../interfaces/post.interface";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: "15px",
      display: "flex",
    },
    left: {
      width: "1070px",
      height: "1080px",
      borderRadius: "15px",
      backgroundColor: "#ffffff",
      padding: "25px",
      boxShadow: "rgba(0,0,0,0.10) 0 0 10px",
    },
    right: {
      padding: "25px",
      marginLeft: "25px",
      paddingRight: "35px",
      paddingLeft: "35px",

      maxWidth: "400px",
      backgroundColor: "#ffffff",
      boxShadow: "rgba(0,0,0,0.10) 0 0 10px",
      borderRadius: "15px",
    },
    rightHeader: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "32px",
      lineHeight: "48px",
      paddingBottom: "15px",
    },
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  })
);

interface IProps {
  variant: ProjectPageVariants;
  project: IProject;
  recommended: IProject[] | undefined | null;
  setPostModal: Function;
  onToggle: () => void;
  showCreatePostModal: () => void;
  isEditing: boolean;
  toggleIsEditing: () => void;
}

export const ProjectBody = (props: IProps) => {
  const {
    variant,
    project,
    setPostModal,
    recommended,
    showCreatePostModal,
    isEditing,
    toggleIsEditing,
  } = props;
  const classes = useStyles();
  const [bodyOption, setBodyOption] = useState<BodyOption>(
    BodyOptions.INFORMATION
  );
  const toggleBodyOption = (option: BodyOption) => {
    setBodyOption(option);
  };
  const isInformation = bodyOption === BodyOptions.INFORMATION;
  const isUpdates = bodyOption === BodyOptions.UPDATES;

  const blocksFromHtml = htmlToDraft(project.editorState || "");
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const initialEditorState = EditorState.createWithContent(contentState);

  const [editorState, setEditorState] =
    useState<EditorState>(initialEditorState);
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;
  //@ts-ignore

  const saveEditorState = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios
      .put(
        `/api/projects/by-id/${project._id}`,
        {
          editorState: draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          ),
        },
        config
      )
      .then((res) => console.log("res:", res));
    console.log(
      "sent req",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <Container>
      <div className={classes.root}>
        <br />
        <div className={classes.left}>
          <ProjectNavbar
            onClick={toggleBodyOption}
            option={bodyOption}
            project={project}
            showCreatePostModal={showCreatePostModal}
            isEditing={isEditing}
            toggleIsEditing={toggleIsEditing}
            saveEditorState={saveEditorState}
          />
          {isInformation ? (
            <ProjectBodyInformation
              variant={variant}
              project={project}
              isEditing={isEditing}
              toggleIsEditing={toggleIsEditing}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />
          ) : isUpdates ? (
            <ProjectBodyUpdates
              variant={variant}
              project={project}
              setPostModal={setPostModal}
            />
          ) : (
            ""
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.rightHeader}>Creator’s Other Projects</div>
          {recommended &&
            recommended.slice(0, 2).map((p, i) => (
              <div>
                <CreateProjectCard project={p} key={"other-projects#" + i++} />
                {i === 1 ? (
                  <hr
                    style={{
                      border: "0.1px solid rgba(0,0,0,0.05)",
                      marginTop: "15px",
                      marginBottom: "15px",
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
};
