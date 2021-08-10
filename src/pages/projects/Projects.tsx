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
import { useHistory } from "react-router";
import axios from "axios";
import { parseQueryString } from "../../utils/queryString";
import { MainCategories } from "../../config";
import { compareArrays } from "../../utils/matchArrays";

interface IProps {}
interface ICategory {
  title: string;
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
export const Projects = (props: IProps) => {
  const history = useHistory();

  const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const categoryIndex = categories.findIndex((c) => c.title === value);
    if (categoryIndex < 0) return;
    const newCategories = [...categories];
    newCategories[categoryIndex].checked =
      !newCategories[categoryIndex].checked;
    setCategories([...categories]);
  };

  const rawCategories = [
    ...MainCategories.community,
    ...MainCategories.creative,
    ...MainCategories.technology,
  ];

  const cats = rawCategories.map((c) => {
    return { title: c, onClick, checked: false };
  });

  const [query, setQuery] = useState<string>();
  const [categories, setCategories] = useState<ICategory[]>(cats);
  const [filters, setFilters] = useState<string[]>([]);

  const [fetchedProjects, setProjects] = useState<
    IProject[] | null | undefined
  >([]);

  const [matchedProjects, setMatchedProjects] = useState<
    IProject[] | null | undefined
  >([]);

  const [rendered_projects, setRenderedProjects] = useState<
    IProject[] | null | undefined
  >([]);

  interface IQueryParams {
    query?: string;
    filter?: string;
    order?: string;
  }
  useEffect(() => {
    const setProjects = async (q: string) => {
      const projectsFound: IProject[] = await searchProjects(q);
      setMatchedProjects(projectsFound);
      setRenderedProjects(projectsFound);
    };

    const filterProjects = (f: string[]) => {
      const filtered = matchedProjects?.filter((project) => {
        return compareArrays(project.tags, f).length > 0;
      });
      setRenderedProjects(filtered);
    };

    const queryParams: IQueryParams = parseQueryString(window.location.search);

    console.log(queryParams);
    queryParams.query && setProjects(queryParams.query);
    queryParams.filter && queryParams.filter !== ""
      ? filterProjects(queryParams.filter.split(","))
      : setRenderedProjects(matchedProjects);
  }, [window.location.search]);

  const projectsMeta = useSelector((state: RootState) => state.loadProjects);
  const { projects }: any = projectsMeta;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    setProjects(projects);
    setMatchedProjects(projects);
    setRenderedProjects(projects);
  }, [projects]);

  useEffect(() => {
    const filtersToSet = categories.map((cat) => {
      if (cat.checked) {
        return cat.title;
      }
    });
    const filteredList = filtersToSet.filter((cat) => cat !== undefined);
    // @ts-ignore
    setFilters(filteredList || []);
  }, [categories]);

  useEffect(() => {
    history.push(`/projects?query=${query ?? ""}&filter=${filters}`);
  }, [filters]);

  const searchProjects = async (q?: string): Promise<IProject[]> => {
    const { data } = await axios.get(`/api/projects?q=${q}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  };
  const handleOnClick = async () => {
    history.push(`/projects?query=${query}`);
  };
  return (
    <div>
      <ProjectsNavbarHero />
      <ProjectsSearchBar
        onKeyUp={(e: any) => setQuery(e.target.value)}
        onClick={handleOnClick}
      />
      <ProjectsOverview
        projects={rendered_projects}
        categories={categories}
        setCategories={setCategories}
      />
      <DonateHero />
      <Footer />
    </div>
  );
};
