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

export const ProjectOverview = ({ match }: any) => {
  const { id } = useParams<IRouteParams>();
  const [p, setP] = useState<any>();
  const variant = "static";
  const classes = useStyles();
  const [trending, setTrending] = useState<IProject[] | undefined | null>();
  const dispatch = useDispatch();

  const trendingMeta = useSelector((state: RootState) => state.loadTrending);
  const { trendingProjects }: any = trendingMeta;

  const featuredTitle = "Recommended Projects";
  const featuredSubHeader = (
    <span>
      Freshly launched community projects that <br />
      are looking for UP votes and support
    </span>
  );
  const featuredOnClick = () => {};

  const [postModal, setPostModal] = useState<IPost | Record<never, never>>();
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const toggleShowImageModal = () => {
    setShowImageModal(!showImageModal);
  };
  const [editableHeader, setEditableHeader] = useState<boolean>(false);
  const [editableBody, setEditableBody] = useState<boolean>(false);
  const toggleEditableHeader = () => {
    setEditableHeader(!editableHeader);
  };
  const toggleEditableBody = () => {
    setEditableBody(!editableBody);
  };

  useEffect(() => {
    dispatch(getTrendingProjects());
  }, []);

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
  }, []);

  return (
    <div className={classes.root}>
      {postModal && Object.keys(postModal).length ? (
        <ProjectPostModal
          post={postModal as IPost}
          onClick={() => setPostModal({})}
        />
      ) : (
        ""
      )}
      {showImageModal ? (
        <ProjectImageModal project={p} onClick={toggleShowImageModal} />
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
            />
          ) : (
            <EditableProjectHeader
              project={p}
              variant={variant}
              showImageModal={toggleShowImageModal}
              onToggle={toggleEditableHeader}
            />
          )}
          {!editableBody ? (
            <ProjectBody
              project={p}
              variant={variant}
              setPostModal={setPostModal}
              recommended={trendingProjects}
              onToggle={toggleEditableBody}
            />
          ) : (
            <EditableProjectBody
              project={p}
              variant={variant}
              setPostModal={setPostModal}
              recommended={trendingProjects}
              onToggle={toggleEditableBody}
            />
          )}

          <Container className={classes.featuredSection}>
            <FeaturedSection
              title={featuredTitle}
              subHeader={featuredSubHeader}
              projects={trending}
              onClick={featuredOnClick}
            />
          </Container>
          <DonateHero />
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
};
