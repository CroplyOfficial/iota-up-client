import {
  createStyles,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { FavoriteSharp } from "@material-ui/icons";
import { Container } from "../../../components/container/container";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: "25px",
      backgroundColor: "#202D42",
      borderRadius: "10px",
      color: "white",
      padding: "41px",
      paddingTop: "48px",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 800,
      fontStyle: "normal",
      fontSize: "24px",
      lineHeight: "36px",
      paddingBottom: "16px",
    },
    text: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "19.07px",
      width: "85%",
      paddingBottom: "29px",
    },
    button: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      textTransform: "none",
      padding: "15px",
      borderRadius: "10px",
    },
    icon: {
      fontSize: "18px",
      lineHeight: "27px",
    },
  })
);
export const ProjectsDonateCard = () => {
  const classes = useStyles();
  const onClick = () => null;
  return (
    <div className={classes.root}>
      <Typography className={classes.header}>
        Donate to <br /> the UP Project.
      </Typography>
      <Typography className={classes.text}>
        UP is a free to use community initiative for the development and support
        of independent creators.
      </Typography>

      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        endIcon={<FavoriteSharp />}
        onClick={onClick}
      >
        Donate Now
      </Button>
    </div>
  );
};
