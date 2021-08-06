import { createStyles, makeStyles, Theme } from "@material-ui/core";

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

      "&:focus": {
        outline: "none",
        //boxShadow: `0 0 3pt 2pt ${theme.palette.primary.main}`,
        fontSize: "20px",
      },
    },
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
