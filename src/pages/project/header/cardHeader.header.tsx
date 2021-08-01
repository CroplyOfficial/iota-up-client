import {
  CardHeader,
  Typography,
  IconButton,
  makeStyles,
  createStyles,
  Avatar,
  Theme,
} from "@material-ui/core";
import { Flag, ArrowUpward, Share } from "@material-ui/icons";
import { IProject } from "../../../interfaces/project.interface";

interface IProps {
  project: IProject | Record<never, never>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      height: "60px",
      paddingBottom: "35px",
    },
    headerWrapper: {},
    header: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
    },
    subHeader: {
      fontFamily: "Open Sans",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "19px",
      color: theme.palette.primary.main,
      paddingRight: "20px",
    },
    subHeader2: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "19px",
    },
    subHeaderWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    ul: {},
    li: {},
    avatar: {
      width: "60px",
      height: "60px",
      backgroundColor: "orange",
    },
    action: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "100%",
      paddingTop: "8px",
    },
  })
);
export const HeaderCardHeader = (props: IProps) => {
  const classes = useStyles();
  const { project } = props;
  const { images = ["", "", "", "", "", "", ""], created_by } =
    project as IProject;
  const fullName = "Peter Parker"; // TODO get user from created_by
  const fallbackImage = "";
  const mainImage = images[0] || fallbackImage;
  return (
    <CardHeader
      className={classes.root}
      avatar={
        <Avatar
          src={mainImage}
          className={classes.avatar}
          alt={fullName}
        ></Avatar>
      }
      title={<span className={classes.header}>Peter Parker</span>}
      subheader={
        <span>
          <span className={classes.subHeader}> 6 Projects </span>
          <span className={classes.subHeader2}>&bull; New York, USA</span>
        </span>
      }
      /*title={
        <span className={classes.headerWrapper}>
          <Typography className={classes.header}>{fullName}</Typography>
        </span>
      }
      subheader={
        <div className={classes.subHeaderWrapper}>
          <Typography color="primary" className={classes.subHeader}>
            6Projects
          </Typography>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <Typography className={classes.subHeader2}>
                New York, USA
              </Typography>
            </li>
          </ul>
        </div>
      }*/
      action={
        <div className={classes.action}>
          <IconButton>
            <Share fontSize="large" />
          </IconButton>
          <IconButton>
            <Flag fontSize="large" />
          </IconButton>
          <IconButton>
            <ArrowUpward fontSize="large" color="primary" />
          </IconButton>
        </div>
      }
    />
  );
};
