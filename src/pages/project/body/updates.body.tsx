import { createStyles, makeStyles } from "@material-ui/core";
import { ProjectPageVariants } from "../../../interfaces/project.variants.interface";
import { IProject } from "../../../interfaces/project.interface";

const useStyles = makeStyles(() => createStyles({ root: {} }));

interface IProps {
  variant: ProjectPageVariants;
  project: IProject | Record<never, never>;
}
export const ProjectBodyUpdates = (props: IProps) => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};
