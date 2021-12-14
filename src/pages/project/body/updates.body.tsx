import { createStyles, makeStyles } from "@material-ui/core";
import { ProjectPageVariants } from "../../../interfaces/project.variants.interface";
import { IProject } from "../../../interfaces/project.interface";
import { IPost } from "../../../interfaces/post.interface";
import { UpdatesCard } from "./updatesCard.body";

const useStyles = makeStyles(() => createStyles({ root: {} }));

interface IProps {
  variant: ProjectPageVariants;
  project: IProject;
  setPostModal: Function;
}
export const ProjectBodyUpdates = (props: IProps) => {
  const { project, setPostModal } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {project?.posts?.map((p, i) => (
        <UpdatesCard
          post={p}
          key={"post#" + i++}
          onClick={() => setPostModal({ ...p })}
        />
      ))}
    </div>
  );
};
