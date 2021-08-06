import {
  createStyles,
  makeStyles,
  Card as MaterialCard,
  CardMedia,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { IProject } from "../../interfaces/project.interface";
import { MoneySharp, CalendarTodaySharp } from "@material-ui/icons";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "381px",
      height: "381px",
      borderRadius: ".8rem",
    },
    media: {
      height: "175px",
      width: "100%",
    },
    body: {
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "175px",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      textTransform: "uppercase",
    },
    title: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "30px",
    },
    subHeader: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "15px",
    },
    stat: {},
    addNewButton: {},
  })
);
interface IProps {
  project: IProject;
}
export const Card2 = (props: IProps) => {
  const { project } = props;
  const { media, name, backers, upvotes } = project;
  const classes = useStyles();
  const mainTag = project?.tags[0];
  const fallbackImage = "https://source.unsplash.com/random";

  const mainImage = project?.media[0] || fallbackImage;
  return (
    <MaterialCard className={classes.root}>
      <CardMedia className={classes.media} image={mainImage} />
      <div className={classes.body}>
        <Typography color="primary" className={classes.header}>
          {mainTag}
        </Typography>
        <Typography className={classes.title}>{project.name}</Typography>
        <Typography color="textPrimary" className={classes.subHeader}>
          <CalendarTodaySharp />
          UP Votes: {upvotes}
        </Typography>
      </div>
    </MaterialCard>
  );
};
