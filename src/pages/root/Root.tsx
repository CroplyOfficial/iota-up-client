import { makeStyles, createStyles } from "@material-ui/core";
import React from "react";
import { Container } from "../../components/container/container";
import { Navbar } from "../../components/navbar/Navbar";
import "../../static/css/root/root.css";
import { FeaturedSection } from "./featuredSection.root";
import { Hero } from "./hero.root";
import { Counter } from "./counter.root";
import { SampleCategorieCards } from "./sampleState";
import { Categories } from "./categories/categories.root";
import { ICard } from "../../interfaces/categoriesCard.interface";
import { DonateHero } from "../../components/donateHero/donateHero";
import { Footer } from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../store";
import { IProject } from "../../interfaces/project.interface";
import {
  getTrendingProjects,
  getLatestProjects,
} from "../../actions/projectsActions";

const useStyles = makeStyles(() =>
  createStyles({
    heroContainer: {
      paddingBottom: "30vh",
    },
    featuredSection: {
      paddingBottom: "107px",
    },
    lastSection: {
      paddingBottom: "107px",
    },
  })
);

interface IProps {}
export const Root = (props: IProps) => {
  const dispatch = useDispatch();

  const [featured, setFeatured] = useState<IProject[] | undefined | null>();
  const [latest, setLatest] = useState<IProject[] | undefined | null>();

  const featuredMeta = useSelector((state: RootState) => state.loadTrending);
  const latestMeta = useSelector((state: RootState) => state.loadLatest);
  const { trendingProjects }: any = featuredMeta;
  const { latestProjects }: any = latestMeta;

  const classes = useStyles();

  useEffect(() => {
    dispatch(getTrendingProjects());
    dispatch(getLatestProjects());
  }, []);

  useEffect(() => {
    setLatest(latestProjects);
  }, [latestProjects]);

  useEffect(() => {
    setFeatured(trendingProjects);
  }, [trendingProjects]);
  /* FEATURED */
  const featuredTitle = "Projects on the UP";
  const featuredSubHeader = (
    <div>
      Some of the top voted for and supported projects
      <br />
      accross all categories from the UP community
      <br />
      creators, designers, and developers
    </div>
  );
  // const featuredProjects = [...SampleProjects].sort(() => Math.random() - 0.5);
  const featuredOnClick = () => null;
  /* FEATURED */

  /* LATEST */
  const latestTitle = "Latest Projects";
  const latestSubHeader = (
    <div>
      Freshly launched community projects that
      <br />
      are looking for UP votes and support
    </div>
  );
  // const latestProjects = [...SampleProjects].sort(() => Math.random() - 0.5);
  const latestOnClick = () => null;
  /* LATEST */

  /* Cards */
  const categoriesPreHeader = "categories";
  const categoriesTitle = (
    <div>
      Explore the Community
      <br />
      Discover the Future.
    </div>
  );
  const categoriesSubHeader = (
    <div>
      Looking to support specific projects?
      <br />
      Check out the latest and most UP voted
      <br />
      community projects by category.
    </div>
  );
  const categoriesCards: Array<ICard> = [...SampleCategorieCards];
  // .sort(
  // () => Math.random() - 0.5
  //);
  /* Cards */

  return (
    <React.Fragment>
      <Container className={classes.heroContainer}>
        <Hero />
      </Container>
      <Container>
        <FeaturedSection
          className={classes.featuredSection}
          title={featuredTitle}
          subHeader={featuredSubHeader}
          projects={featured}
          onClick={featuredOnClick}
        />
        <FeaturedSection
          className={classes.lastSection}
          title={latestTitle}
          subHeader={latestSubHeader}
          projects={latest}
          onClick={latestOnClick}
        />
      </Container>
      {/*
      <Container>
        <Counter />
      </Container>
          */}
      <Container>
        <Categories
          preHeader={categoriesPreHeader}
          title={categoriesTitle}
          subHeader={categoriesSubHeader}
          cards={categoriesCards}
        />
      </Container>
      <DonateHero />
      <Footer />
    </React.Fragment>
  );
};
