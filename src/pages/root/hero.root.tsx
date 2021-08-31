import React from "react";
import {
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import greenFairy from "../../static/images/green_fairy.png";
import { Link } from "react-router-dom";
import { DonateButton } from "../../components/DonateButton/DonateButton";
import { iotaWalletAdress } from "../../config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      paddingTop: "100px",
      paddingBottom: "50px",
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
      paddingTop: "180px",
    },
    header: {
      fontSize: "60px",
      lineHeight: "90px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      [theme.breakpoints.down("sm")]: {
        fontSize: "26px",
        lineHeight: "32px",
      }
    },
    subHeader: {
      fontSize: "44px",
      lineHeight: "75px",
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      [theme.breakpoints.down("sm")]: {
        fontSize: "26px",
        lineHeight: "32px",
      }
    },
    text: {
      paddingTop: "51px",
      maxWidth: "30vw",
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
      [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      }
    },
    buttons: {
      display: "flex",
      "& > button": {
        marginRight: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(1),
        },
      },
      paddingTop: "46px",
    },
    buttonLeft: {
      marginLeft: "0px",
      padding: "20px",
      paddingTop: "10px",
      paddingBottom: "10px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
      color: "white",
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
        [theme.breakpoints.down("sm")]: {
          height: "100%",
        },
        background: !image ? color || green[300] : "",
        borderRadius: "50%",
      [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
      }
      },
      image: {
        height: "100%",
        transform: "translate(0, -50px)",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        width: "90%",
        maxWidth: "414px",
        transform: "translate(0, 150px)",
      }
      },
    })
  );
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.oval}>
        <img src={image} className={classes.image} />
      </div>
    </React.Fragment>
  );
};

export const Hero = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Typography variant="h6" className={classes.preHeader} color="primary">
          - Rise Up!
        </Typography>
        <div>
          <Typography variant="h3" className={classes.header}>
            Create. Share. Grow.
          </Typography>
          <Typography className={classes.subHeader}>
            The Community Project Platform
          </Typography>
        </div>

        <Typography className={classes.text}>
          UP is a project sharing platform that enables creators to connect with
          the community. Offering a one-stop shop to share updates and connect
          with a global audience, to gain support and exposure for
          groundbreaking innovation and design.
        </Typography>

        <div className={classes.buttons}>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "inherit",
              paddingRight: "45px",
            }}
          >
            <Button
              endIcon={<ArrowRight />}
              color="secondary"
              variant="contained"
              className={classes.buttonLeft}
            >
              Learn More
            </Button>
          </Link>
          <DonateButton
            recipientName="IOTA UP"
            wallet={iotaWalletAdress}
            text="donate"
          >
            <Button variant="outlined" className={classes.buttonRight}>
              Donate
            </Button>
          </DonateButton>
        </div>
      </div>

      <div className={classes.right}>
        <Oval image={greenFairy} color="#C4C4C4" />
      </div>
    </div>
  );
};
