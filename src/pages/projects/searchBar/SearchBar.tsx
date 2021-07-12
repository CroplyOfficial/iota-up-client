import { ProjectsSearchBarIcon } from "./icon.searchBar";
import { ProjectsSearchBarInput } from "./input.searchBar";
import { ProjectsSearchBarDropdown } from "./dropdown.searchBar";
import { Typography, makeStyles, createStyles, Theme } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
    },
    searchBar: {
      width: "50%",
      height: "80px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "10px",
      boxShadow: "0px 10px 15px -5px rgba(0,0,0,0.2)",
      transform: "translate(0%, -50%)",
      backgroundColor: "white",
      padding: "15px",
      paddingLeft: "50px",
      paddingRight: "50px",
    },
  })
);

interface ISearchBarProps {
  onChange: () => void;
  onClick: () => void;
}
export const ProjectsSearchBar = (props: ISearchBarProps) => {
  const { onChange, onClick } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.searchBar}>
        <ProjectsSearchBarDropdown />
        <ProjectsSearchBarInput onChange={onChange} />
        <ProjectsSearchBarIcon onClick={onClick} />
      </div>
    </div>
  );
};