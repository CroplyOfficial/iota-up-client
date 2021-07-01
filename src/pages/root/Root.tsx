import React from "react";
import {Container} from "../../components/container/container";
import {Navbar} from "../../components/navbar/Navbar";
import "../../static/css/root/root.css";
import {Hero} from "./hero.root";

export const Root = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Hero />
      </Container>
    </React.Fragment>
  );
};
