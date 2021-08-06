import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { IProject } from "../../../interfaces/project.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "capitalize",
      backgroundColor: `${theme.palette.primary.main}4D`,
      color: "black",
      width: "298px",
      height: "25px",
      borderRadius: "10px",
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "24px",
      textAlign: "center",
    },
  })
);
interface IProps {
  project: IProject;
}
export const ContributorPill = (props: IProps) => {
  const { project } = props;
  const classes = useStyles();
  console.log("P:", project);
  if (!project.lookingForContributors) return null;
  return <div className={classes.root}>Looking for Contributors</div>;
};
