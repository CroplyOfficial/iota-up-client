import { createStyles, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectHeader } from "./header/Header";
import { EditableProjectHeader } from "./header/Header.editable";
import { ProjectBody } from "./body/ProjectBody";
import { EditableProjectBody } from "./body/ProjectBody.editable";
import { FeaturedSection } from "../root/featuredSection.root";
import { Container } from "../../components/container/container";
import { DonateHero } from "../../components/donateHero/donateHero";
import { Footer } from "../../components/footer/Footer";
import { IPost } from "../../interfaces/post.interface";
import { ProjectPostModal } from "./postModal.project";
import { ProjectImageModal } from "./imageModal.project";
import { IProject } from "../../interfaces/project.interface";
import { getTrendingProjects } from "../../actions/projectsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ProjectCreatePostModal } from "./createPostModal.project";
import { UserProjectsModal } from "../../components/modals/UserProjectsModal";
import { getProject } from "../../actions/projectsActions";
import { useHistory } from "react-router";
import axios from "axios";

interface IRouteParams {
  id: string;
}
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#FBFBFB",
    },
    featuredSection: {
      marginTop: "150px",
      paddingBottom: "90px",
    },
  })
);

interface IProps {
  match: any;
  setShowMessages: (show: boolean) => void;
  setShowList: (show: boolean) => void;
  setChatId: (id: string) => void;
}
export const ProjectOverview = ({
  match,
  setShowMessages,
  setShowList,
  setChatId,
}: IProps) => {
  const { id } = useParams<IRouteParams>();
  const [p, setP] = useState<any>();
  const variant = "static";
  const classes = useStyles();
  const [trending, setTrending] = useState<IProject[] | undefined | null>();
  const dispatch = useDispatch();
  const history = useHistory();

  const trendingMeta = useSelector((state: RootState) => state.loadTrending);
  const { trendingProjects }: any = trendingMeta;

  const projectMeta = useSelector((state: RootState) => state.loadProject);
  const { project }: any = projectMeta;

  const featuredTitle = "Recommended Projects";
  const featuredSubHeader = (
    <span>
      Freshly launched community projects that <br />
      are looking for UP votes and support
    </span>
  );
  const featuredOnClick = () => {};

  const [postModal, setPostModal] = useState<IPost | Record<never, never>>();

  /* IMAGE MODAL */
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const toggleShowImageModal = () => {
    setShowImageModal(!showImageModal);
  };
  /* IMAGE MODAL */

  /* CREATE POST MODAL */
  const [showCreatePostModal, setShowCreatePostModal] = useState<
    IPost | Record<never, never>
  >(false);
  const toggleShowCreatePostModal = () => {
    setShowCreatePostModal(!showCreatePostModal);
  };
  /* CREATE POST MODAL */

  const [editableHeader, setEditableHeader] = useState<boolean>(false);
  const [editableBody, setEditableBody] = useState<boolean>(false);
  const toggleEditableHeader = () => {
    dispatch(getProject(match.params.id));
    setEditableHeader(!editableHeader);
  };
  const toggleEditableBody = () => {
    setEditableBody(!editableBody);
  };

  useEffect(() => {
    dispatch(getTrendingProjects());
    dispatch(getProject(match.params.id));
  }, [window.location.href]);

  useEffect(() => {
    setTrending(trendingProjects);
  }, [trendingProjects]);

  useEffect(() => {
    const setProject = async () => {
      const projectById = await axios.get(
        `/api/projects/by-id/${match.params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setP(projectById.data);
    };

    setProject();
  }, [project, window.location.href]);
  const [showUserProjectsModal, setShowUserProjectsModal] =
    useState<boolean>(false);
  const toggleShowUserProjectModal = () => {
    setShowUserProjectsModal(!showUserProjectsModal);
  };

  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;

  const handleSaveModal = async (media: string[], video?: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(
      `/api/projects/by-id/${project?._id}`,
      { media, video },
      config
    );
    dispatch(getProject(project?._id));
    setShowImageModal(false);
  };

  return (
    <div className={classes.root}>
      {
        <UserProjectsModal
          project={project}
          onClick={toggleShowUserProjectModal}
          showing={showUserProjectsModal}
        />
      }
      {postModal && Object.keys(postModal).length ? (
        <ProjectPostModal
          post={postModal as IPost}
          project={project}
          onClick={() => setPostModal({})}
        />
      ) : (
        ""
      )}
      {showCreatePostModal ? (
        <ProjectCreatePostModal
          onClick={toggleShowCreatePostModal}
          project={p}
        />
      ) : (
        ""
      )}

      {showImageModal ? (
        <ProjectImageModal
          project={p}
          onClick={toggleShowImageModal}
          onSave={handleSaveModal}
        />
      ) : (
        ""
      )}

      {p && (
        <React.Fragment>
          {!editableHeader ? (
            <ProjectHeader
              project={p}
              variant={variant}
              showImageModal={toggleShowImageModal}
              onToggle={toggleEditableHeader}
              showUserProjectsModal={toggleShowUserProjectModal}
              setShowList={setShowList}
              setShowMessages={setShowMessages}
              setChatId={setChatId}
            />
          ) : (
            <EditableProjectHeader
              project={p}
              variant={variant}
              showImageModal={toggleShowImageModal}
              onToggle={toggleEditableHeader}
              showUserProjectsModal={toggleShowUserProjectModal}
            />
          )}
          {/*          {!editableBody ? ( */}
          <ProjectBody
            project={p}
            variant={variant}
            setPostModal={setPostModal}
            recommended={trendingProjects}
            onToggle={toggleEditableBody}
            showCreatePostModal={toggleShowCreatePostModal}
            isEditing={editableBody}
            toggleIsEditing={toggleEditableBody}
          />
          {/*
          ) : (
            <EditableProjectBody
              project={p}
              variant={variant}
              setPostModal={setPostModal}
              recommended={trendingProjects}
              onToggle={toggleEditableBody}
              showCreatePostModal={toggleShowCreatePostModal}
            />
          )}
            */}

          <Container className={classes.featuredSection}>
            <FeaturedSection
              title={featuredTitle}
              subHeader={featuredSubHeader}
              projects={trending}
              onClick={featuredOnClick}
              onClickButton={() => {
                window.scrollTo(0, 0);
                history.push(`/projects?query=&filter=&order=popular`);
              }}
            />
          </Container>
          <DonateHero />
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
};
