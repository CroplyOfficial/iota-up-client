import { Typography, makeStyles, createStyles, Theme } from "@material-ui/core";
//import { WorldMap } from "../../static/icons/worldMap";
import worldMap from "../../static/images/worldMap.png";
import { Container } from "../../components/container/container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      width: "100%",
      height: "489px",
      position: "relative",
      paddingTop: "0px",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "75px",
      zIndex: 2,
      color: "white",
      textAlign: "center",
      position: "absolute",
      bottom: "50%",
      left: "50%",
      transform: "translate(-50%,40%)",
      [theme.breakpoints.down("sm")]: {
        fontSize: "35px",
        lineHeight: "46px",
        transform: "translate(-50%,0%)",
      },
    },
    container: {
      width: "100%",
      height: "100%",
      textAlign: "center",
      position: "relative",
    },
    worldMap: {
      [theme.breakpoints.down("sm")]: {
        transform: "translate(-50%,-30%)",
      },
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
      <Container className={classes.container}>
        <img src={worldMap} className={classes.worldMap} />

        <Typography variant="h2" className={classes.header}>
          {header}
        </Typography>
      </Container>
    </div>
  );
};
