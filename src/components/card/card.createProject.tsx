import { createStyles, makeStyles, Theme, Button } from "@material-ui/core";
import { IProject } from "../../interfaces/project.interface";
import { Typography, IconButton, Avatar, CardHeader } from "@material-ui/core";
import { Flag, ArrowUpward, Share } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

interface IProps {
  project: IProject;
}
export const CreateProjectCard = (props: IProps, ctx: any) => {
  const { project } = props;
  const { media, name, desc } = project;
  const mainImage = media[0];
  const history = useHistory();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        maxHeight: "560px",
        display: "flex",
        flexDirection: "column",
      },
      imageWrapper: {
        height: "152px",
        width: "100%",
        borderRadius: "15px",
        paddingBottom: "24px",
        backgroundSize: "100%",
        backgroundImage: `url(${mainImage})`,
      },
      header: {
        fontFamily: "Poppins",
        fontWeight: 700,
        fontStyle: "normal",
        fontSize: "20px",
        lineHeight: "30px",
        color: theme.palette.text.primary,
        paddingTop: "18px",
        paddingBottom: "18px",
      },
      description: {
        fontFamily: "Poppins",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
        color: theme.palette.text.primary,
      },
      actionBar: {},
      avatar: {},
      button: {
        fontFamily: "Poppins",
        fontWeight: 700,
        fontStyle: "normal",
        fontSize: "18px",
        lineHeight: "27px",
        color: "white",
        textTransform: "capitalize",
        paddingTop: "12.5px",
        paddingBottom: "12.5px",
        borderRadius: "10px",
        width: "100%",
      },
    })
  );

  const classes = useStyles(mainImage);
  return (
    <div className={classes.root}>
      <div className={classes.imageWrapper}></div>
      <div className={classes.header}>{name}</div>
      <div className={classes.description}>{truncate(desc, 206)}</div>
      <CardFooter project={project} />

      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={() => history.push("/project/" + project._id)}
      >
        View Project
      </Button>
    </div>
  );
};

function truncate(str: string, n: number) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

interface IHeaderProps {
  project: IProject | Record<never, never>;
}

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      paddingTop: "15px",
      paddingBottom: "15px",
      height: "60px",
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

function CardFooter(props: IHeaderProps) {
  const classes = useStyles2();
  const { project } = props;
  const { media, projectAuthor } = project as IProject;
  const fullName = projectAuthor; // TODO get user from created_by
  const fallbackImage = "";
  const mainImage = media[0] || fallbackImage;
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
      title={<span className={classes.header}>{fullName}</span>}
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
    />
  );
}
