import { createStyles, makeStyles, Theme, Grid, TextField,  } from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import {useIsMobile} from "../../../utils/isMobile";

interface IProps {
  onKeyUp: (e: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 70,
      height: "70px",
      padding: 0,
      margin: 0,
      border: "none",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      color: "#000000",
      paddingLeft: "20px",
      transition: ".1s ease-in all",
      width: "100%",

      "&:focus": {
        outline: "none",
        //boxShadow: `0 0 3pt 2pt ${theme.palette.primary.main}`,
        fontSize: "20px",
      },
    },
    grid: {
      display: "flex",
    }
  })
);
export const ProjectsSearchBarInput = (props: IProps) => {
  const classes = useStyles();
  const { onKeyUp } = props;
  const placeHolder = "Find projects...";
  return (
    <input
      onKeyUp={onKeyUp}
      className={classes.root}
      placeholder={placeHolder}
    />
  );
};
