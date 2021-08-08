import {
  Typography,
  Card as MaterialCard,
  CardContent,
  makeStyles,
  createStyles,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
  SvgIcon,
} from "@material-ui/core";
import {
  ArrowUpward,
  LocalAtm,
  FavoriteBorder,
  FavoriteOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import { ICreator } from "../../interfaces/creator.interface";
import { IProject } from "../../interfaces/project.interface";
import { BrandLogo } from "../../static/icons/brand-logo";
import { BrandLogoOutlined } from "../../static/icons/brand-logo.outlined";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IProps {
  project: IProject;
  history?: any;
}

export const Card = ({ project, history }: IProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "381px",
        height: "569px",
        borderRadius: ".8rem",
        cursor: "pointer",
      },
      media: {
        height: 0,
        maxHeight: "172px",
        paddingTop: "56.25%", // 16:9
      },
      level: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: "10px",
        "& > *": {
          fontFamily: "Poppins",
          fontWeight: 700,
          fontStyle: "standard",
          fontSize: "18px",
          lineHeight: "27px",
        },
      },
      header: {
        fontFamily: "Poppins",
        fontWeight: 700,
        fontStyle: "standard",
        fontSize: "20px",
        lineHeight: "30px",
        paddingBottom: "30px",
      },
      stats: {
        "& > *": {
          fontFamily: "Open Sans",
          fontWeight: 400,
          fontStyle: "standard",
          fontSize: "16px",
          lineHeight: "28px",
        },
      },
      stat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      statIcon: {
        paddingRight: "20px",
      },
      statAmount: {
        paddingLeft: "20px",
      },
      statusBar: {
        paddingTop: "80px",
        paddingLeft: "0px",
      },
      subHeader: {
        display: "flex",
        flexDirection: "row",
      },
      statusBarHeader: {
        fontFamily: "Poppins",
        fontWeight: 500,
        fontStyle: "standard",
        fontSize: "18px",
        lineHeight: "27px",
      },
      statusBarSubHeader1: {
        fontFamily: "Open Sans",
        fontWeight: 700,
        fontStyle: "standard",
        fontSize: "14px",
        lineHeight: "19px",
      },
      statusBarSubHeader2: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "standard",
        fontSize: "14px",
        lineHeight: "19px",
      },
      ul: {
        padding: 0,
        margin: 0,
        paddingLeft: "2rem",
      },
      li: {},
    })
  );
  const classes = useStyles();

  const { name, media, tags, upvotes, projectAuthor } = project;
  const [creator, setCreator] = useState<ICreator>();
  const [liked, setLiked] = useState<boolean>(false);
  const fallbackImage = "";
  const fallbackTag = "community";
  const mainImage = media[0] || fallbackImage;
  const mainTag = (tags[0] || fallbackTag).toUpperCase();

  const myInfoMeta = useSelector((state: RootState) => state.myInfo);
  const { myInfo }: any = myInfoMeta;
  const handleOnClick = () => {
    history.push("/project/" + project._id);
  };

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
    <MaterialCard
      className={classes.root}
      onClick={(e) => (window.location.href = `/project/${project._id}`)}
    >
      <CardMedia
        image={mainImage}
        title={project.name}
        className={classes.media}
      />
      <CardContent>
        <div className={classes.level}>
          <Typography variant="h2" color="primary">
            {mainTag}
          </Typography>
          {/*
    <MaterialCard className={classes.root}>
      <CardMedia
        image={mainImage}
        title={name}
        className={classes.media}
        onClick={handleOnClick}
      />
      <CardContent>
        <div id="not-card-header" onClick={handleOnClick}>
          <div className={classes.level}>
            <Typography variant="h2" color="primary">
              {mainTag}
            </Typography>
            {/*
          <IconButton>
            <ArrowUpward />
          </IconButton>
            */}
        </div>

        <Typography variant="h3" className={classes.header}>
          {name}
        </Typography>

        <div className={classes.stats}>
          <Typography variant="h6" className={classes.stat}>
            <FavoriteBorder className={classes.statIcon} />
            UP Votes
            <span className={classes.statAmount}> {upvotes} </span>
          </Typography>
        </div>
        {creator && (
          <CardHeader
            className={classes.statusBar}
            avatar={<Avatar alt="avatar" src={creator.avatar}></Avatar>}
            title={
              <span className={classes.statusBarHeader}>
                {creator.fullName}
              </span>
            }
            subheader={
              <div className={classes.subHeader}>
                <Typography
                  color="primary"
                  className={classes.statusBarSubHeader1}
                >
                  {`${creator.projects && creator.projects.length} Projects`}
                </Typography>
                <ul className={classes.ul}>
                  <li className={classes.li}>
                    <Typography className={classes.statusBarSubHeader2}>
                      {`${creator.city}, ${creator.country}`}
                    </Typography>
                  </li>
                </ul>
              </div>
            }
            action={
              <IconButton>
                <ArrowUpward color="primary" />
              </IconButton>
            }
          />
        )}
      </CardContent>
    </MaterialCard>
  );
};
