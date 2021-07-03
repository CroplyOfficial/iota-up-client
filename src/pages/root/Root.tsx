import {makeStyles, createStyles} from "@material-ui/core";
import React from "react";
import {Container} from "../../components/container/container";
import {Navbar} from "../../components/navbar/Navbar";
import "../../static/css/root/root.css";
import {FeaturedSection} from "./featuredSection.root";
import {Hero} from "./hero.root";
import { Counter } from "./counter.root";
import { SampleProjects } from "./sampleState";

const useStyles = makeStyles(()=>createStyles({
  heroContainer: {
    paddingBottom: "30vh",
  },
  featuredSection: {
    paddingBottom: "107px",
  },
  lastSection: {
    paddingBottom: "107px",
  }
}))

export const Root = () => {
  const classes = useStyles();

  /* FEATURED */
  const featuredTitle = "Projects on the UP";
  const featuredSubHeader = (
    <div>
    Some of the top voted for and supported projects
    <br/>
accross all categories from the UP community
  <br/>
creators, designers, and developers
  </div>);
  const featuredProjects = [...SampleProjects].sort(() => Math.random() - 0.5 );
  const featuredOnClick = () => null;
  /* FEATURED */

  /* LATEST */
  const latestTitle = "Latest Projects";
  const latestSubHeader = (<div>
    Freshly launched community projects that
    <br/>
    are looking for UP votes and support
    </div>);
  const latestProjects = [...SampleProjects].sort(() => Math.random() - 0.5 );
  const latestOnClick = () => null;
  /* LATEST */

  return (
    <React.Fragment>
      <Navbar />
      <Container className={classes.heroContainer}>
        <Hero />
      </Container>
      <Container>
        <FeaturedSection className={classes.featuredSection} title={featuredTitle} subHeader={featuredSubHeader} projects={featuredProjects} onClick={featuredOnClick} />
        <FeaturedSection className={classes.lastSection} title={latestTitle} subHeader={latestSubHeader} projects={latestProjects} onClick={latestOnClick} />
      </Container>
      <Container> 
        <Counter />
      </Container>
    </React.Fragment>
  );
};
