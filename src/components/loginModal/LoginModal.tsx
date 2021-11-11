import { createStyles, makeStyles, Typography, Theme } from "@material-ui/core";
import {
  GoogleLoginButton,
  LinkedInLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import { AUTH_ROOT } from "../../config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "100vw",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 3,
    },
    background: {
      width: "100%",
      height: "100%",
      position: "relative",
      top: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    card: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "20%",
      height: "400px",
      background: "white",
      borderRadius: "10px",
      padding: "15px",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
    button: {},
    header: {
      height: "10%",
      textAlign: "center",
      padding: "10px",
    },
    body: {
      height: "90%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {},
    title: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "75px",
    },
  })
);
interface IProps {
  onClick: () => void;
}
export const LoginModal = (props: IProps) => {
  const { onClick } = props;
  const classes = useStyles();
  return (
    <div className={classes.modal}>
      <div className={classes.background} onClick={onClick}></div>
      <div className={classes.card}>
        <header className={classes.header}>
          <Typography className={classes.title}>Login</Typography>
        </header>
        <section className={classes.body}>
          <GoogleLoginButton
            onClick={() =>
              (window.location.href = `${AUTH_ROOT}/users/authgoogle`)
            }
          />
          <LinkedInLoginButton
            onClick={() =>
              (window.location.href = `${AUTH_ROOT}/users/authlinkedin`)
            }
          />
          <FacebookLoginButton
            onClick={() =>
              (window.location.href = `${AUTH_ROOT}/users/authfacebook`)
            }
          />
        </section>
        <footer className={classes.footer}></footer>
      </div>
    </div>
  );
};
