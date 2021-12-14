import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import { IPost } from "../../../interfaces/post.interface";
import {useIsMobile} from "../../../utils/isMobile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
    },
    header: {
      fontFamily: "Poppins",
      fontSize: "32px",
      lineHeight: "48px",
      fontWeight: 700,
      fontStyle: "normal",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px", 
        lineHeight: "32px",
      }
    },
    subHeader: {
      fontFamily: "Poppins",
      fontSize: "20px",
      lineHeight: "30px",
      fontWeight: 700,
      fontStyle: "normal",
      color: theme.palette.text.secondary,
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px", 
        lineHeight: "22px",
      }
    },
    button: {
      width: "230px",
      padding: "15px",
      fontFamily: "Poppins",
      fontSize: "18px",
      lineHeight: "27px",
      fontWeight: 700,
      fontStyle: "normal",
      [theme.breakpoints.down("sm")]: {
        width: "100px",
      }
    },
  })
);

interface IProps {
  post: IPost;
  onClick: () => void;
}
export const UpdatesCard = (props: IProps) => {
  const isMobile = useIsMobile();
  const { post, onClick } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.header}>{post.title}</Typography>
        <Typography className={classes.subHeader}>
          {new Date(post.created).toLocaleString()}
        </Typography>
      </div>

      <Button
        onClick={onClick}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        {!isMobile ? "View Post" : "View" }
      </Button>
    </div>
  );
};
