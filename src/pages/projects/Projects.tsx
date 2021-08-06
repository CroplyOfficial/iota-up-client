import { useState, useEffect } from "react";
import { DonateHero } from "../../components/donateHero/donateHero";
import { Footer } from "../../components/footer/Footer";
import { IProject } from "../../interfaces/project.interface";
import { ProjectsOverview } from "./overview/Overview";
import { ProjectsSearchBar } from "./searchBar/SearchBar";
import { ProjectsNavbarHero } from "./navbarHero.projects";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../actions/projectsActions";
import { RootState } from "../../store";
import axios from "axios";

interface IProps {}
export const Projects = (props: IProps) => {
  const [query, setQuery] = useState<string>();

  const [fetchedProjects, setProjects] = useState<
    IProject[] | null | undefined
  >([]);

  const [rendered_projects, setRenderedProjects] = useState<
    IProject[] | null | undefined
  >([]);

  const projectsMeta = useSelector((state: RootState) => state.loadProjects);
  const { projects }: any = projectsMeta;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    setProjects(projects);
    setRenderedProjects(projects);
  }, [projects]);

  const handleOnClick = async () => {
    const { data }: any = await axios.get(`/api/projects?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setRenderedProjects(data);
  };
  return (
    <div>
      <ProjectsNavbarHero />
      <ProjectsSearchBar
        onKeyUp={(e: any) => setQuery(e.target.value)}
        onClick={handleOnClick}
      />
      <ProjectsOverview projects={rendered_projects} />
      <DonateHero />
      <Footer />
    </div>
  );
};
