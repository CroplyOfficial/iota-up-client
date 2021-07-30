import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import { IPost } from "../../../interfaces/post.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
    },
    header: {
      fontFamily: "Poppins",
      fontSize: "32px",
      lineHeight: "48px",
      fontWeight: 700,
      fontStyle: "normal",
    },
    subHeader: {
      fontFamily: "Poppins",
      fontSize: "20px",
      lineHeight: "30px",
      fontWeight: 700,
      fontStyle: "normal",
      color: theme.palette.text.secondary,
    },
    button: {
      width: "230px",
      padding: "15px",
      fontFamily: "Poppins",
      fontSize: "18px",
      lineHeight: "27px",
      fontWeight: 700,
      fontStyle: "normal",
    },
  })
);

interface IProps {
  post: IPost;
  onClick: () => void;
}
export const UpdatesCard = (props: IProps) => {
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
        View Post
      </Button>
    </div>
  );
};
