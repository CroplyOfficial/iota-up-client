import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  Theme,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Card } from "../../../components/card/card";
import { Container } from "../../../components/container/container";
import { IProject } from "../../../interfaces/project.interface";
import { ProjectsDonateCard } from "./donateCard.projects";
import { ProjectsFilterCard } from "./filterCard.projects";
import { ProjectsPopularSearch } from "./popularSearch.projects";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    columns: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      width: "100%",
    },
    left: {
      width: "25%",
      padding: "20px",
      paddingTop: "0",
    },
    right: {
      width: "75%",
      padding: "20px",
      paddingTop: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    actionBar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingBottom: "25px",
    },
    projectsWrapper: {
      display: "flex",
      flexWrap: "wrap",
      gap: "25px",
      padding: "0",
      justifyContent: "flex-start",
    },
    actionBarText: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "32px",
      lineHeight: "48px",
    },
    filterHeader: {},
    button: {
      border: `3px solid ${theme.palette.primary.main}`,
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      borderRadius: "10px",
      "&:hover": {
        border: `3px solid ${theme.palette.primary.main}`,
      },
    },
    loadMoreButton: {
      marginTop: "75px",
      marginBottom: "150px",
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      borderRadius: "5px",
      padding: "15px",
      paddingLeft: "50px",
      paddingRight: "50px",
    },
  })
);
interface ICategory {
  title: string;
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
interface IProps {
  projects: IProject[] | null | undefined;
  categories: ICategory[];
  sortMethod: string;
  setSortMethod: (method: string) => void;
  setCategories: (categories: ICategory[]) => void;
}
export const ProjectsOverview = (props: IProps) => {
  const { projects, categories, setCategories, sortMethod, setSortMethod } =
    props;
  const onClick = () => {
    // TODO lazy load
  };
  const classes = useStyles();
  // TODO get popular Tags from API
  // TODO remove default popular tags in <ProjectsPopularSearch />
  const popularTags = [
    { title: "Technology Projects", onClick: () => null },
    { title: "Charity Programs", onClick: () => null },
    { title: "Community Website", onClick: () => null },
  ];
  const loadMoreThreshold = 6;
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <ProjectsPopularSearch tags={popularTags} />
        <div className={classes.columns}>
          <div className={classes.left}>
            <Typography
              className={classes.actionBarText}
              style={{ paddingBottom: "25px" }}
            >
              Filter
            </Typography>
            <ProjectsFilterCard
              categories={categories}
              setCategories={setCategories}
            />
            <ProjectsDonateCard />
          </div>
          <div className={classes.right}>
            <div className={classes.actionBar}>
              <Typography className={classes.actionBarText}>
                {projects && projects.length ? projects.length : "0"} Projects
                found
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortMethod}
                onChange={(e: any) => setSortMethod(e.target.value)}
              >
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="!popular">Least Popular</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
              </Select>
            </div>
            <div className={classes.projectsWrapper}>
              {projects &&
                projects.map((p, i) => (
                  <Card project={p} key={"project-card#" + i++} />
                ))}
            </div>
            {projects &&
            projects.length &&
            projects.length >= loadMoreThreshold ? (
              <Button
                className={classes.loadMoreButton}
                onClick={onClick}
                variant="contained"
                color="secondary"
              >
                Load more
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
