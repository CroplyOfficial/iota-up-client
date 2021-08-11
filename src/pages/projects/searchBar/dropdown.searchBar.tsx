import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import { MainCategories } from "../../../config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "17px",
      lineHeight: "40px",
      height: "74px",
      margin: 0,
      paddingLeft: "20px",
      paddingRight: "20px",
      backgroundColor: "inherit",
      border: "none",
      stroke: "none",
      borderRadius: "10px 0 0 10px",
      borderRadiusTopLeft: "10px",
      "&:focus": {
        outline: "none",
        //boxShadow: `0 0 3pt 2pt ${theme.palette.primary.main}`,
      },
      "&:after": {
        content: "",
        background: "black",
        position: "absolute",
        bottom: "0",
        left: "0",
        height: "100%",
        width: "1.5px",
      },
    },
  })
);
export const ProjectsSearchBarDropdown = () => {
  const [options, setOptions] = useState<Array<any>>(
    Object.values(MainCategories)
      .reduce((arr: string[], cur: string[]) => {
        return arr.concat(cur);
      }, [])
      .map((i) => {
        return { value: i, tag: i };
      })
    /*[
    { value: "technology", tag: "Technology" },
    { value: "community", tag: "Community" },
    { value: "creative", tag: "Creative" },
  ]*/
  );
  const classes = useStyles();
  return (
    <select className={classes.root}>
      <option value="">All Categories</option>
      {options.map((o) => (
        <option value={o.value} style={{ textTransform: "capitalize" }}>
          {o.tag}
        </option>
      ))}
    </select>
  );
};
