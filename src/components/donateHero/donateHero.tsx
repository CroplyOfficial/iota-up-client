import {
  makeStyles,
  createStyles,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

interface IProps {
  onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: "533px",
      minHeight: "300px",
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      textAlign: "center",
      paddingTop: "100px",
      paddingBottom: "100px",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "75px",
    },
    button: {
      paddingLeft: "35px",
    },
    buttonText: {
      color: "#ffffff",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "27px",
      textAlign: "center",
    },
    icon: {
      color: "#ffffff",
      padding: "10px",
      paddingLeft: "20px",
    },
  })
);
export const DonateHero = (props: IProps) => {
  const { onClick } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.header}>
        The only way is UP!
        <br />
        Help support our work.
      </Typography>

      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        onClick={onClick}
      >
        <Typography variant="h6" className={classes.buttonText}>
          Donate Now
        </Typography>
        <Favorite className={classes.icon} />
      </Button>
    </div>
  );
};
