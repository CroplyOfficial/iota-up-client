import { createStyles, makeStyles, Button } from "@material-ui/core";
import { Card2 } from "../../../components/card/card2";
import { IProject } from "../../../interfaces/project.interface";
import { AddNewProjectCard } from "../AddNewProjectCard.dashboard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyProjects } from "../../../actions/projectsActions";
import { RootState } from "../../../store";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      gap: "5rem",
      paddingLeft: "5rem",
      flexWrap: "wrap",
      transform: "translate(0,-175px)",
      position: "relative",
    },
    button: {
      padding: "16px",
      paddingLeft: "58px",
      paddingRight: "58px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "27px",
      borderRadius: "10px",
      position: "absolute",
      bottom: 0,
      right: 0,
      transform: "translate(-14rem,125px)",
    },
  })
);
interface IProps {
  handleCreateProjectModal: () => void;
}
export const DashboardProjects = (props: IProps) => {
  const { handleCreateProjectModal } = props;
  const classes = useStyles();

  const [projects, setProjects] = useState<IProject[] | undefined | null>();
  const dispatch = useDispatch();

  const myProjectsMeta = useSelector(
    (state: RootState) => state.loadMyProjects
  );
  const { myProjects }: any = myProjectsMeta;

  useEffect(() => {
    dispatch(getMyProjects());
  }, []);

  useEffect(() => {
    setProjects(myProjects);
  }, [myProjects]);

  return (
    <div>
      <div className={classes.root}>
        {projects && projects.map((p) => <Card2 project={p} />)}
        <AddNewProjectCard onClick={handleCreateProjectModal} />
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};
