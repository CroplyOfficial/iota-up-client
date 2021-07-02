import React from "react";
import { Typography, Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import {ArrowRight} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme)=> createStyles({
  root: {
    display: "flex",
    paddingTop: "150px",
  },
  left: {
  },
  right: {
    zIndex: -1,
    position: "absolute",
    bottom:"5vh",
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
    fontSize: "60px",
    lineHeight: "90px",
    fontFamily: "Poppins",
    fontWeight: 700,
    fontStyle: "normal",
  },
  subHeader: {
    fontSize: "50px",
    lineHeight: "75px",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontStyle: "normal",
  },
  text: {
    paddingTop: "51px",
    maxWidth: "30vw",
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "28px",
    
  },
  buttons: {
    "& > button": {
       marginRight: theme.spacing(5),
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
       lineHeight: "28px"
  },
  buttonRight: {
      padding: "20px",
      paddingTop: "10px",
    paddingBottom: "10px",
       fontFamily: "Poppins",
       fontWeight: 700,
       fontStyle: "normal",
       fontSize: "16px",
       lineHeight: "28px"
  },
}))

interface IOvalProps {
  image: string;
  color?: string;
}
const Oval = ({image, color}: IOvalProps) => {
  const useStyles = makeStyles(() => createStyles({
    oval: {
      width: "1046px",
      height: "678px",
      background: color || green[300],
      borderRadius: "50%",
    }
  }));
  const classes = useStyles();
  return(<React.Fragment>
    <div className={classes.oval}></div>
    </React.Fragment>);
}

export const Hero = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}> 
        <div className={classes.left}>
          <Typography variant="h6" className={classes.preHeader} color="primary">
             -  Rise Up!
          </Typography>
          <div> 
            <Typography variant="h3" className={classes.header}>
              Create. Share. Grow.
            </Typography>
            <Typography className={classes.subHeader}>
              Open Community Donations
            </Typography>
          </div>

          <Typography className={classes.text}> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          </Typography>

          <div className={classes.buttons}>
            <Button endIcon={<ArrowRight/>} color="secondary" variant="contained" className={classes.buttonLeft}>Learn More</Button>
            <Button variant="outlined" className={classes.buttonRight} >Donate</Button>
          </div>
        </div>

        <div className={classes.right}>
          <Oval image="" color="#C4C4C4"/>
        </div>
    </div>)
}
