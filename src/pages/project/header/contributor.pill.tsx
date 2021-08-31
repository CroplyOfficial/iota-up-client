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
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      }
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
  if (!project.needContributors) return null;
  return <div className={classes.root}>Looking for Contributors</div>;
};
