import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Button,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { AboutUsHeroCard } from "./heroCard.about_us";
import { VerifiedUser } from "@material-ui/icons";
import LandingPageImage from "../../static/images/landingpage.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      paddingTop: "100px",
      paddingBottom: "100px",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "0px",
        paddingBottom: "30px",
      },
    },
    left: {},
    right: {
      zIndex: -1,
      position: "absolute",
      bottom: "5vh",
      right: "-5vw",
    },
    preHeader: {
      fontSize: "20px",
      lineHeight: "30px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      paddingBottom: "16px",
    },
    header: {
      fontSize: "50px",
      lineHeight: "75px",
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
        lineHeight: "30px",
        overflowWrap: "normal",
      },
    },
    subHeader: {
      fontSize: "50px",
      lineHeight: "75px",
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
        lineHeight: "32px",
      },
    },
    text: {
      paddingTop: "20px",
      width: "30vw",
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
      [theme.breakpoints.down("sm")]: {
        width: "90vw",
      },
    },
    buttons: {
      paddingTop: "46px",
      display: "block",
    },
    buttonLeft: {
      paddingBottom: "10px",
    },
    buttonRight: {
      padding: "20px",
      paddingTop: "10px",
      paddingBottom: "10px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
    },
    icon: {
      width: "50px",
      height: "50px",
    },
  })
);
interface IOvalProps {
  image: string;
  color?: string;
}
const Oval = ({ image, color }: IOvalProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      oval: {
        width: "1046px",
        height: "678px",
        background: color || green[300],
        borderRadius: "50%",
        maskImage: `url(${image})`,
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          maxWidth: "90vw",
          height: "auto",
          overflow: "hidden !important",
          display: "none",
        },
      },
    })
  );
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.oval}>
        <img src={image} />
      </div>
    </React.Fragment>
  );
};

export const AboutUsHero = () => {
  const classes = useStyles();
  const heroCard1 = {
    header: "UP Vote Projects",
    subHeader:
      "Creators can share their work, projects, and solutions, and provide insights into their world and how support will create a change.",
  };
  const heroCard2 = {
    header: "Donate & Support",
    subHeader:
      "Supports can browse the community projects and support, share, and donate, to what they believe in, knowing their donations go straight to the creators.",
  };
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Typography variant="h6" className={classes.preHeader} color="primary">
          - How it works
        </Typography>
        <div>
          <Typography variant="h3" className={classes.header}>
            Community Funded Open
          </Typography>
          <Typography className={classes.subHeader}>
            Donations Platform
          </Typography>
        </div>

        <Typography className={classes.text}>
          As a global community, there is always the need to support and
          encourage one another to help progress and develop new creative
          initiatives. UP provides a zero commitment, social donation platform,
          so that you can support or create in an open space.
        </Typography>

        <div className={classes.buttons}>
          <AboutUsHeroCard
            header={heroCard1.header}
            subHeader={heroCard1.subHeader}
            className={classes.buttonLeft}
            icon={
              <VerifiedUser
                color="primary"
                fontSize="large"
                className={classes.icon}
              />
            }
          />
          <AboutUsHeroCard
            header={heroCard2.header}
            subHeader={heroCard2.subHeader}
            icon={
              <VerifiedUser
                color="primary"
                fontSize="large"
                className={classes.icon}
              />
            }
          />
        </div>
      </div>

      <div className={classes.right}>
        <Oval image={LandingPageImage} color="#C4C4C4" />
      </div>
    </div>
  );
};
