import { createStyles, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectHeader } from "./header/Header";
import { useProject } from "./utils/useProject";
import { Navbar } from "../../components/navbar/Navbar";
import { ProjectBody } from "./body/ProjectBody";
import { SampleProjects } from "../root/sampleState";
import { FeaturedSection } from "../root/featuredSection.root";
import { Container } from "../../components/container/container";
import { DonateHero } from "../../components/donateHero/donateHero";
import { Footer } from "../../components/footer/Footer";
import { IPost } from "../../interfaces/post.interface";
import { ProjectPostModal } from "./postModal.project";
import { ProjectImageModal } from "./imageModal.project";

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
export const ProjectOverview = () => {
  const { id } = useParams<IRouteParams>();

  const { loading, project } = useProject(id);
  const p = SampleProjects[0];
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
  const featuredProjects: any[] = SampleProjects.slice(0, 5);

  const [postModal, setPostModal] = useState<IPost | Record<never, never>>();
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const toggleShowImageModal = () => {
    setShowImageModal(!showImageModal);
  };
  return (
    <div className={classes.root}>
      {postModal && Object.keys(postModal).length && (
        <ProjectPostModal
          post={postModal as IPost}
          onClick={() => setPostModal({})}
        />
      )}
      {showImageModal && (
        <ProjectImageModal project={p} onClick={toggleShowImageModal} />
      )}

      <Navbar />
      {loading ? (
        <div>Loading...</div>
      ) : (
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
              projects={featuredProjects}
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
