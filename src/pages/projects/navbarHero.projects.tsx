import { Typography, makeStyles, createStyles, Theme } from "@material-ui/core";
import { WorldMap } from "../../static/icons/worldMap";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      width: "100vw",
      height: "645px",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "75px",
    },
  })
);

export const ProjectsNavbarHero = () => {
  const classes = useStyles();
  const header = (
    <span>
      Fund the Future.
      <br />
      Support Creators Worldwide.
    </span>
  );
  return (
    <div className={classes.root}>
      <WorldMap color="primary" />
      <Typography variant="h2" className={classes.header}>
        {header}
      </Typography>
    </div>
  );
};
