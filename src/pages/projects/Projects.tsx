import { useState } from "react";
import { DonateHero } from "../../components/donateHero/donateHero";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { IProject } from "../../interfaces/project.interface";
import { ProjectsOverview } from "./overview/Overview";
import { ProjectsSearchBar } from "./searchBar/SearchBar";
import { ProjectsNavbarHero } from "./navbarHero.projects";
import { SampleProjects } from "../root/sampleState";

interface IProps {}
export const Projects = (props: IProps) => {
  const [projects, setProjects] = useState<IProject[]>(
    /*[
    {
      created_at: 0,
      tags: [],
      images: ["https://source.unsplash.com/random", "", "", "", "", ""],
      donations: 2,
      funding: [423, 2332],
      created_by: "Peter McKinnon",
      upvotes: 112,
      completed: false,
      title: "Peter McKinnon's Photography 101 For Beginners",
      description: "I am a project.",
      milestones: [],
    },
    {
      created_at: 0,
      tags: [],
      images: ["https://source.unsplash.com/random", "", "", "", "", ""],
      donations: 2,
      funding: [423, 2332],
      created_by: "Peter McKinnon",
      upvotes: 112,
      completed: false,
      title: "Peter McKinnon's Photography 101 For Beginners",
      description: "I am a project.",
      milestones: [],
    },
    {
      created_at: 0,
      tags: [],
      images: ["https://source.unsplash.com/random", "", "", "", "", ""],
      donations: 2,
      funding: [423, 2332],
      created_by: "Peter McKinnon",
      upvotes: 112,
      completed: false,
      title: "Peter McKinnon's Photography 101 For Beginners",
      description: "I am a project.",
      milestones: [],
    },
  ] */
    SampleProjects
  );

  const handleOnChange = () => {};
  const handleOnClick = () => {};
  return (
    <div>
      <ProjectsNavbarHero />
      <ProjectsSearchBar onChange={handleOnChange} onClick={handleOnClick} />
      <ProjectsOverview projects={projects} />
      <DonateHero />
      <Footer />
    </div>
  );
};
