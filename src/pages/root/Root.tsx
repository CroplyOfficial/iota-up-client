import {makeStyles, createStyles} from "@material-ui/core";
import React from "react";
import {Container} from "../../components/container/container";
import {Navbar} from "../../components/navbar/Navbar";
import "../../static/css/root/root.css";
import {FeaturedSection} from "./featuredSection.root";
import {Hero} from "./hero.root";

const useStyles = makeStyles(()=>createStyles({
  heroContainer: {
    paddingBottom: "30vh",
  }
}))

export const Root = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Navbar />
      <Container className={classes.heroContainer}>
        <Hero />
      </Container>
      <Container>
        <FeaturedSection />
      </Container>
    </React.Fragment>
  );
};
