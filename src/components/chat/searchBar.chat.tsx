import {
  createStyles,
  InputBase,
  makeStyles,
  fade,
  Theme,
} from "@material-ui/core";
import { Search as SearchIcon, Tune } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 10,
      backgroundColor: "white",
      padding: "5px",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      transition: "0.2s ease-in",
      backgroundColor: fade(theme.palette.common.black, 0.15),
      border: `2px solid white`,
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        border: `2px solid black`,
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    optionsIcon: {
      padding: theme.spacing(0, 1),
      height: "100%",
      top: 0,
      right: 0,
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  })
);
export const ChatSearchBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={`${process.env.TEST || "Search Messages…"}`}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <div className={classes.optionsIcon}>
          <Tune />
        </div>
      </div>
    </div>
  );
};
