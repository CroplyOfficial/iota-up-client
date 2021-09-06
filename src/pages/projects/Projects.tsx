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
import { useIsMobile } from "../../utils/isMobile";
import { FilterCardModal } from "./searchBar/filterCard.modal";

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
  const [projectsToRender, setProjectsToRender] = useState<
    IProject[] | undefined | null
  >([]);

  interface IQueryParams {
    query?: string;
    filter?: string;
    order?: "newest" | "popular" | "!popular" | "oldest" | "";
  }

  const projectsMeta = useSelector((state: RootState) => state.loadProjects);
  const { loading, projects }: any = projectsMeta;

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

  const dispatch = useDispatch();
  useEffect(() => {
    interface IQueryParams {
      q?: string;
      filter?: string;
      order?: string;
    }
    const queryParams = parseQueryString(
      window.location.search
    ) as IQueryParams;
    console.log(queryParams);
    dispatch(
      getProjects(queryParams?.q, queryParams?.filter, queryParams?.order)
    );
  }, [window.location.search]);

  useEffect(() => {
    setProjectsToRender(projects);
  }, [projects]);

  useEffect(() => {
    history.push(
      `/projects?query=${query ?? ""}&filter=${filters}&order=${sortMethod}`
    );
  }, [filters, sortMethod]);

  const handleOnClick = async () => {
    history.push(`/projects?query=${query}`);
  };
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<boolean>(false);
  const handleToggleOpen = () => {
    setOpen(!open);
  };
  return (
    <div
      {...(!isMobile
        ? {}
        : {
            style: {
              width: "100vw",
              height: "calc(100vh - 74px)",
              overflow: open ? "hidden" : "scroll",
              overflowX: "hidden",
            },
          })}
    >
      {!isMobile ? <ProjectsNavbarHero /> : <></>}
      <FilterCardModal
        open={open}
        onClick={handleToggleOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <ProjectsSearchBar
        onKeyUp={(e: any) => {
          setQuery(e.target.value);
          console.log("e.traget", e.target.value);
          if (e.code === "Enter") {
            handleOnClick();
          }
        }}
        onClick={handleOnClick}
        category={cat}
        setCategory={setCat}
        openModal={handleToggleOpen}
      />
      <ProjectsOverview
        projects={projectsToRender}
        isLoading={loading}
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
