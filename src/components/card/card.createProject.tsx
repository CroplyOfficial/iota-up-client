import { createStyles, makeStyles, Theme, Button } from "@material-ui/core";
import { IProject } from "../../interfaces/project.interface";
import { Typography, IconButton, Avatar, CardHeader } from "@material-ui/core";
import { Flag, ArrowUpward, Share } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { ICreator } from "../../interfaces/creator.interface";
import axios from "axios";

interface IProps {
  project: IProject;
}
export const CreateProjectCard = (props: IProps, ctx: any) => {
  const { project } = props;
  const { name, media, desc } = project;

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
  project: IProject;
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
  const { project }: { project: IProject } = props;
  const { media, projectAuthor } = project as IProject;
  const fallbackImage = "";
  const mainImage = media[0] || fallbackImage;
  const [creator, setCreator] = useState<ICreator>();

  useEffect(() => {
    const getCreator = async (userId: string) => {
      const { data }: any = await axios.get(`/api/users/overview/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCreator(data);
    };
    getCreator(projectAuthor);
  }, []);

  return (
    <CardHeader
      className={classes.root}
      avatar={
        <Avatar
          src={creator && creator.avatar}
          className={classes.avatar}
          alt="creator avatar"
        ></Avatar>
      }
      title={<span className={classes.header}>{project.name}</span>}
      subheader={
        <span>
          <span className={classes.subHeader}>
            {" "}
            {`${creator?.projects && creator?.projects.length} Projects`}
          </span>
          <span className={classes.subHeader2}>
            &bull;
            {` ${creator && creator.city}, ${creator && creator.country}`}
          </span>
        </span>
      }
    ></CardHeader>
  );
}
