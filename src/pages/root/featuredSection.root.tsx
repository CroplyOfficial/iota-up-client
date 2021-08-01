import {
  createStyles,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { Card } from "../../components/card/card";
import { IProject } from "../../interfaces/project.interface";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    text: {
      textAlign: "center",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "standard",
      fontSize: "50px",
      lineHeight: "75px",
    },
    subHeader: {
      paddingTop: "25px",
      paddingBottom: "100px",
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "standard",
      fontSize: "16px",
      lineHeight: "28px",
    },
    cards: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-around",
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
  projects: IProject[];
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
        <Typography variant="h4" className={classes.subHeader}>
          {subHeader}
        </Typography>
      </div>
      <div className={classes.cards}>
        {projects.slice(0, 3).map((p, i) => (
          <Card project={p} key={"featured-project-" + (i + 1)} />
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
