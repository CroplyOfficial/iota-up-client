import {
  createStyles,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "fixed",
      zIndex: 2,
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    card: {
      width: "650px",
      height: "300px",
      backgroundColor: "#f5f5f5",
      zIndex: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      borderRadius: "15px",
      padding: "15px",
      paddingBottom: "20px",
      paddingTop: "20px",
    },
    header: {
      textAlign: "center",
      fontSize: "50px",
      lineHeight: "75px",
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      paddingBottom: "15px",
    },
    body: {
      height: "70%",
      fontSize: "15px",
      lineHeight: "28px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
    },
    footer: {
      display: "flex",
      width: "100%",
      flexDirection: "row-reverse",
      gap: "25px",
    },
    button: {
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      padding: "10px",
      paddingLeft: "30px",
      paddingRight: "30px",
      borderRadius: "10px",
    },
  })
);

interface IProps {
  showing: boolean;
  onClick: () => void;
}
export const DashboardDeleteModal = (props: IProps) => {
  const classes = useStyles();
  const { showing, onClick } = props;
  const handleDeleteAccount = () => null;
  return (
    <div>
      {showing && (
        <div className={classes.modal}>
          <div className={classes.background} onClick={onClick}></div>
          <div className={classes.card}>
            <div className={classes.header}>Delete Account</div>
            <div className={classes.body}>
              <Typography color="textPrimary">
                By confirming to delete your account, you agree, that we will
                delete all personal data belonging to you. This step is not
                revertable. All data will be lost forever.
              </Typography>
            </div>
            <div className={classes.footer}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleDeleteAccount}
              >
                Confirm
              </Button>
              <Button
                onClick={onClick}
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
