import {
  makeStyles,
  createStyles,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { DonateButton } from "../DonateButton/DonateButton";
import { iotaWalletAdress } from "../../config";
import {Container} from "../container/container";

interface IProps {
  onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
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
      [theme.breakpoints.down("sm")]: {
        maxHeight: "300px",
        minHeight: "200px",
        paddingTop: "30px",
        paddingBottom: "30px",
        paddingRight: "80px",
      },
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "75px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "26px",
        lineHeight: "31px",
      },
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
    <div className={classes.wrapper}>
      <Typography variant="h2" className={classes.header}>
        The only way is UP!
        <br />
        Help support our work.
      </Typography>

      <DonateButton
        recipientName="Iota UP"
        text="donation to up project"
        wallet={iotaWalletAdress}
      >
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
      </DonateButton>

    </div>
  );
};
