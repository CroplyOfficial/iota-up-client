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
} from "@material-ui/core";
import { ArrowUpward, LocalAtm, FavoriteBorder, FavoriteOutlined, ThumbUpOutlined } from "@material-ui/icons";
import { IProject } from "../../interfaces/project.interface";
import { BrandLogo } from "../../static/icons/brand-logo";
import { BrandLogoOutlined } from "../../static/icons/brand-logo.outlined";

interface IProps {
  project: IProject;
}

export const Card = (props: IProps) => {
  const {project} = props;
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "381px",
        height: "569px",
        borderRadius: ".8rem",

      },
      media: {
        height: 0,
        maxHeight: "172px",
        paddingTop: '56.25%', // 16:9 
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
        }
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
          
        }
      },
      stat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
      },
      statIcon: {
        paddingRight: "20px"
      },
      statAmount: {
        paddingLeft: "20px",
      },
      statusBar: {
        paddingTop: "80px",
        paddingLeft: "0px"
      },
      subHeader: {
        display: "flex",
        flexDirection:"row",
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
        paddingLeft: "2rem"
      },
      li: {
      }
    })
  );
  const classes = useStyles();

  const { title, images, tags, upvotes, donations } = project;
  const fallbackImage = "";
  const fallbackTag = "community";
  const mainImage = images[0] || fallbackImage;
  const mainTag = (tags[0] || fallbackTag).toUpperCase();
  //TODO use user.fullName
  const fullName = "Robert Johnson";

  return (
    <MaterialCard className={classes.root}>
      <CardMedia image={mainImage} title={project.title} className={classes.media} />
      <CardContent>
        <div className={classes.level}>
          <Typography variant="h2" color="primary">{mainTag}</Typography>
          {/*
          <IconButton>
            <ArrowUpward />
          </IconButton>
            */}
        </div>
        
        <Typography variant="h3" className={classes.header}>
          {title}
        </Typography>

        <div className={classes.stats}>
          <Typography variant="h6" className={classes.stat}>
            <LocalAtm className={classes.statIcon}/>
            Total Donations 
            <span className={classes.statAmount}> {donations} </span>
          </Typography>
          <Typography variant="h6" className={classes.stat}>
            <FavoriteBorder className={classes.statIcon}/>
           UP Votes
            <span className={classes.statAmount}> {upvotes} </span>
          </Typography>
        </div>

        <CardHeader 
          className={classes.statusBar}
          avatar={
            <Avatar
              alt="avatar"
              src={mainImage}
            ></Avatar>
          }
          title={<span className={classes.statusBarHeader}>{fullName}</span>}
          subheader={<div className={classes.subHeader}>
            <Typography color="primary" className={classes.statusBarSubHeader1}> 6Projects</Typography>
            <ul className={classes.ul}>
              <li className={classes.li}>
            <Typography className={classes.statusBarSubHeader2}>New York, USA</Typography>
              </li>
            </ul>
        </div>}
          action={
            <IconButton >
              <ArrowUpward color="primary" />
            </IconButton>
              }
        />

      </CardContent>
    </MaterialCard>
  );
};
