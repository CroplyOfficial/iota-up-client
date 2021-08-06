import { createStyles, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectHeader } from "./header/Header";
import { ProjectBody } from "./body/ProjectBody";
import { FeaturedSection } from "../root/featuredSection.root";
import { Container } from "../../components/container/container";
import { DonateHero } from "../../components/donateHero/donateHero";
import { Footer } from "../../components/footer/Footer";
import { IPost } from "../../interfaces/post.interface";
import { ProjectPostModal } from "./postModal.project";
import { ProjectImageModal } from "./imageModal.project";
import { IProject } from "../../interfaces/project.interface";
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

  useEffect(() => {
    const setProject = async () => {
      const projectById = await axios.get(`/api/projects/${match.params.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
          <ProjectHeader
            project={p}
            variant={variant}
            showImageModal={toggleShowImageModal}
          />
          <ProjectBody
            project={p}
            variant={variant}
            setPostModal={setPostModal}
          />
          <Container className={classes.featuredSection}>
            <FeaturedSection
              title={featuredTitle}
              subHeader={featuredSubHeader}
              projects={[]}
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
