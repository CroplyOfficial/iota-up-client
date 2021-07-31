import { createStyles, makeStyles, Button } from "@material-ui/core";
import { Card2 } from "../../../components/card/card2";
import { IProject } from "../../../interfaces/project.interface";
import { SampleProjects } from "../../root/sampleState";
import { AddNewProjectCard } from "../AddNewProjectCard.dashboard";

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
  projects?: IProject[];
}
export const DashboardProjects = (props: IProps) => {
  const { projects } = props;
  const classes = useStyles();
  const handleAddNewProject = () => null;
  return (
    <div>
      <div className={classes.root}>
        {SampleProjects.concat(SampleProjects).map((p) => (
          <Card2 project={p} />
        ))}
        <AddNewProjectCard onClick={handleAddNewProject} />
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
