import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import { Card } from "../../components/card/card";
import { ProjectsCard } from "../../components/card/card3";
import { IProject } from "../../interfaces/project.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    textAlign: {
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
      textAlign: "start",
      }
    },
    text: {
    textAlign: "center",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "standard",
      fontSize: "50px",
      lineHeight: "75px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "26px",
        lineHeight: "32px",
      },
    },
    subHeader: {
      paddingTop: "25px",
      paddingBottom: "100px",
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "standard",
      fontSize: "16px",
      lineHeight: "28px",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "1.5rem",
      },
    },
    cards: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-around",
      [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: "2.5rem",
      },
    },
    actionButton: {},
    actionButtonContainer: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "2.5rem",
    },
    actionButtonSpan: {
      fontFamily: "Poppins",
      fontWeight: 7000,
      fontStyle: "standard",
      fontSize: "18px",
      lineHeight: "27px",
      paddingLeft: "20px",
      paddingRight: "20px",
      color: "white",
    },
  })
);

interface IProps {
  title: string | React.ReactNode;
  subHeader: string | React.ReactNode;
  projects: IProject[] | undefined | null;
  onClick: () => void;
}

export const FeaturedSection = (
  props: IProps & React.HTMLProps<HTMLElement>
) => {
  const { title, subHeader, projects, onClick, className } = props;

  const classes = useStyles();
  return (
    <div className={className}>
      <div className={classes.text}>
        <Typography variant="h2" className={classes.header}>
          {title}
        </Typography>
      <div className={classes.textAlign}> 
        <Typography variant="h4" className={classes.subHeader}>
          {subHeader}
        </Typography>
      </div>
      </div>
      <div className={classes.cards}>
        {projects &&
          projects.slice(0, 3).map((p, i) => (
            //<Card project={p} key={"featured-project-" + (i + 1)} />
            <ProjectsCard project={p} key={"featured-project-" + (i + 1)} />
          ))}
      </div>
      <div className={classes.actionButtonContainer}>
        <Button
          variant="contained"
          className={classes.actionButton}
          color="secondary"
          onClick={onClick}
        >
          <span className={classes.actionButtonSpan}> View More </span>
        </Button>
      </div>
    </div>
  );
};
