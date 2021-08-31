import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  CardHeader,
  Avatar,
  SvgIcon,
  IconButton,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { IProject } from "../../interfaces/project.interface";
import axios from "axios";
import { ICreator } from "../../interfaces/creator.interface";
import { ReactComponent as UpButton } from "../../static/images/icons/up.svg";
import { useFallbackImage } from "../../config";
import { FavoriteBorder } from "@material-ui/icons";

const StyledCardContent = styled(CardContent)({});
const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "&:last-child": {},
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "381px",
      maxHeight: "569px",
      //height: "569px",
      borderRadius: ".8rem",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        maxWidth: "414px",
        height: "auto",
      }
    },
    media: {
      height: 140,
    },
    avatar: {
      color: "white",
      backgroundColor: theme.palette.secondary.main,
    },
    category: {},
    title: {},
    cardHeader: {},
    poppins: {
      fontFamily: "Poppins",
      fontStyle: "normal",
    },
    openSans: {
      fontFamily: "Open Sans",
      fontStyle: "normal",
    },
    w700: {
      fontWeight: 700,
    },
    black: {
      color: theme.palette.text.primary,
    },
    grey: {
      color: theme.palette.text.secondary,
    },
    green: {
      color: theme.palette.primary.main,
    },
    stat: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    stats: {
      paddingTop: "10px",
      "& > *": {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "standard",
        fontSize: "16px",
        lineHeight: "28px",
      },
    },
  })
);
interface IProps {
  project: IProject;
}
export function ProjectsCard(props: IProps) {
  const { project } = props;
  const { projectAuthor, media, name, desc, category } = project;
  const classes = useStyles();
  const [creator, setCreator] = useState<ICreator>();
  const fallbackImage = useFallbackImage();
  const image = media[0] || fallbackImage;

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
    <StyledCard className={classes.root}>
      <CardActionArea
        onClick={(e) => (window.location.href = `/project/${project._id}`)}
      >
        <CardMedia
          className={classes.media}
          image={image}
          title="Project Image"
        />
        <StyledCardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={`${classes.green} ${classes.poppins} ${classes.w700}`}
            style={{
              fontSize: "18px",
              lineHeight: "27px",
              textTransform: "uppercase",
            }}
          >
            {category[0]}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={`${classes.w700} ${classes.black} ${classes.poppins}`}
            style={{ fontSize: "20px", lineHeight: "30px" }}
          >
            {name}
          </Typography>

          <div className={classes.stats}>
            <Typography variant="h6" className={classes.stat}>
              <FavoriteBorder style={{ paddingRight: "20px" }} />
              UP Votes
              <span style={{ paddingLeft: "20px" }}> {project?.upvotes} </span>
            </Typography>
          </div>
        </StyledCardContent>
      </CardActionArea>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            src={creator?.avatar}
            aria-label="avatar"
            className={classes.avatar}
          >
            {creator?.fullName[0] || "R J"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <SvgIcon color="primary" style={{ width: "30px", height: "auto" }}>
              <UpButton />
            </SvgIcon>
          </IconButton>
        }
        title={
          <span
            className={`${classes.black} ${classes.poppins}`}
            style={{ fontWeight: 500 }}
          >
            {creator?.displayName}
          </span>
        }
        subheader={
          <span>
            <span
              className={`${classes.green} ${classes.openSans} ${classes.w700}`}
            >
              {creator?.projects?.length || 0} Projects
            </span>{" "}
            <span
              className={`${classes.grey} ${classes.openSans}`}
              style={{ fontWeight: 400 }}
            >
              &bull; {creator?.city}, {creator?.country}
            </span>
          </span>
        }
      />
    </StyledCard>
  );
}
