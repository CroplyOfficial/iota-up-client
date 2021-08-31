import { makeStyles, createStyles, Theme, Dialog, DialogActions, DialogContent, DialogTitle, Button, MenuItem, Select, FormControl, Input, InputLabel} from "@material-ui/core";
import {FilterList} from "@material-ui/icons";
import { useState } from "react";
import { MainCategories } from "../../../config";
import {useIsMobile} from "../../../utils/isMobile";

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
        [theme.breakpoints.down("sm")]:{
          display: "none",
        }
      },
    },
      container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  dialogContent: {
    width: "65vw",
    height: "auto",
    overflow: "hidden",
  }
  })
);

export const ProjectsSearchBarDropdown = ({
  category,
  setCategory,
}: {
  category: string | undefined;
  setCategory: (category: string) => any;
}) => {
  const [options, setOptions] = useState<Array<any>>([
    { value: "technology", tag: "Technology" },
    { value: "community", tag: "Community" },
    { value: "creative", tag: "Creative" },
  ]);
  const classes = useStyles();
  const defaultOption = isMobile ? "All Categories": "All Categories"
  return (
    isMobile ? 
    <div>
    <Button onClick={handleClickOpen}>
      <FilterList />
    </Button>
     <Select 
      open={open}
      onClose={handleClose}
      onOpen={handleClickOpen}
      style={{display: "none"}}
      onChange={(e: any) => setCategory(e.target.value)
     >
      <MenuItem value="">{defaultOption}</MenuItem>
      {options.map((o) => (
        <MenuItem value={o.value} style={{ textTransform: "capitalize" }}>
          {o.tag}
        </MenuItem>
      ))}
    </Select>            
      </div>
    :
    (<select className={classes.root}>
      <option value="">{defaultOption}</option>
      {options.map((o) => (
        <option value={o.value} style={{ textTransform: "capitalize" }}>
          {o.tag}
        </option>
      ))}
    </select>)
  );
};
