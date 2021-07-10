import { Typography, makeStyles, createStyles, Theme } from "@material-ui/core";
import { IProject } from "../../interfaces/project.interface";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {},
  })
);

interface IViewProps {
  projects: IProject[];
}
export const ProjectsView = (props: IViewProps) => {
  const { projects } = props;
  const classes = useStyles();
  return <div className={classes.root}></div>;
};
