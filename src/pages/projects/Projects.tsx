import { useState } from "react";
import { DonateHero } from "../../components/donateHero/donateHero";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { IProject } from "../../interfaces/project.interface";
import { ProjectsView } from "./projectsView.projects";
import { ProjectsSearchBar } from "./searchBar/SearchBar";
import { ProjectsNavbarHero } from "./navbarHero.projects";

export const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([
    {
      created_at: 0,
      tags: [],
      images: ["https://source.unsplash.com/random", "", "", "", "", ""],
      donations: 2,
      funding: [423, 2332],
      created_by: "Peter McKinnon",
      upvotes: 112,
      completed: false,
      title: "Peter McKinnon's Photography 101",
      description: "I am a project.",
      milestones: [],
    },
  ]);

  const handleOnChange = () => {};
  const handleOnClick = () => {};
  return (
    <div>
      <Navbar variant="secondary" />
      <ProjectsNavbarHero />
      <ProjectsSearchBar onChange={handleOnChange} onClick={handleOnClick} />
      <ProjectsView projects={projects} />
      <DonateHero />
      <Footer />
    </div>
  );
};
