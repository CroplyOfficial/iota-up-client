import {
  Card,
  makeStyles,
  createStyles,
  Typography,
  Theme,
} from "@material-ui/core";
import { PlusOneSharp, AddSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "381px",
      height: "381px",
      borderRadius: "15px",
      border: "5px solid #D7D7D7",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "35px",
      alignItems: "center",
    },
    icon: {
      color: "rgba(196, 196, 196, 1)",
      fontSize: "100px",
    },
    text: {
      textTransform: "uppercase",
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 700,
      color: "rgba(196, 196, 196, 1)",
    },
  })
);

interface IProps {
  onClick: () => void;
}
export const AddNewProjectCard = (props: IProps) => {
  const { onClick } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root} onClick={onClick}>
      <AddSharp className={classes.icon} />
      <Typography className={classes.text}>Add New Project</Typography>
    </Card>
  );
};
