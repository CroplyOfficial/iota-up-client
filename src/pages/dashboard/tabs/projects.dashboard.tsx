import { createStyles, makeStyles } from "@material-ui/core";
import { Card } from "../../../components/card/card";
import { IProject } from "../../../interfaces/project.interface";

const useStyles = makeStyles(() => createStyles({ root: {} }));
interface IProps {
  projects: IProject[];
}
export const DashboardProjects = (props: IProps) => {
  const { projects } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {projects.map((p) => (
        <Card project={p} />
      ))}
    </div>
  );
};
