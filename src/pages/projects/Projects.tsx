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
import { getMyInfo } from "../../actions/userActions";
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
  const [sortMethod, setSortMethod] = useState<string>("newest");
  const [cat, setCat] = useState<string>();

  const [fetchedProjects, setProjects] = useState<
    IProject[] | null | undefined
  >([]);

  const [rendered_projects, setRenderedProjects] = useState<
    IProject[] | null | undefined
  >([]);

  const [sorted, setSorted] = useState<IProject[] | null | undefined>([]);

  interface IQueryParams {
    query?: string;
    filter?: string;
    order?: "newest" | "popular" | "!popular" | "oldest" | "";
  }
  let matches: IProject[] = [];
  let filteredProjects: IProject[] = [];
  let sortedProjects: IProject[] = [];

  useEffect(() => {
    const setProjects = async (q: string) => {
      const projectsFound: IProject[] = await searchProjects(q);
      matches = projectsFound;
    };

    const filterProjects = (f: string[]) => {
      const filtered = matches?.filter((project) => {
        console.log(project);
        return compareArrays(project.category, f).length > 0;
      });
      filteredProjects = filtered;
    };

    const sortByLeastUpvotes = () => {
      filteredProjects.sort((a: IProject, b: IProject) => {
        return a.upvotes - b.upvotes;
      });
      sortedProjects = filteredProjects;
    };

    const sortByNew = () => {
      filteredProjects?.sort((a: IProject, b: IProject) => {
        return new Date(b.created).valueOf() - new Date(a.created).valueOf();
      });
      sortedProjects = filteredProjects;
    };

    const sortByUpvotes = () => {
      filteredProjects?.sort((a: IProject, b: IProject) => {
        return b.upvotes - a.upvotes;
      });
      sortedProjects = filteredProjects;
    };

    const sortByOldest = () => {
      filteredProjects?.sort((a: IProject, b: IProject) => {
        return new Date(a.created).valueOf() - new Date(b.created).valueOf();
      });
      sortedProjects = filteredProjects;
    };

    const sortProjects = (o: string) => {
      switch (o) {
        case "newest":
          return sortByNew();
        case "oldest":
          return sortByOldest();
        case "popular":
          return sortByUpvotes();
        case "!popular":
          return sortByLeastUpvotes();
      }
    };

    const reRender = async () => {
      const queryParams: IQueryParams = parseQueryString(
        window.location.search
      );

      queryParams.query && queryParams.query !== ""
        ? await setProjects(queryParams.query)
        : (matches = projects);
      queryParams.filter && queryParams.filter !== ""
        ? filterProjects(queryParams.filter.split(","))
        : (filteredProjects = matches);
      queryParams.order
        ? sortProjects(queryParams.order)
        : (sortedProjects = filteredProjects);

      if (sortedProjects) {
        sortedProjects =
          sortedProjects.length > 1 ? [...sortedProjects] : sortedProjects;
        setRenderedProjects(sortedProjects);
      }
    };

    reRender();
  }, [window.location.search]);
  const projectsMeta = useSelector((state: RootState) => state.loadProjects);
  const { projects }: any = projectsMeta;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
    dispatch(getMyInfo());
  }, []);

  useEffect(() => {
    setProjects(projects);
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
    history.push(
      `/projects?query=${query ?? ""}&filter=${filters}&order=${sortMethod}`
    );
  }, [filters, sortMethod]);

  const searchProjects = async (q?: string): Promise<IProject[]> => {
    const { data } = await axios.get(`/api/projects?q=${q}&category=${cat}`, {
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
        onKeyUp={(e: any) => {
          setQuery(e.target.value);
          if (e.code === "Enter") {
            handleOnClick();
          }
        }}
        onClick={handleOnClick}
        category={cat}
        setCategory={setCat}
      />
      <ProjectsOverview
        projects={rendered_projects}
        categories={categories}
        setCategories={setCategories}
        sortMethod={sortMethod}
        setSortMethod={setSortMethod}
      />
      <DonateHero />
      <Footer />
    </div>
  );
};
