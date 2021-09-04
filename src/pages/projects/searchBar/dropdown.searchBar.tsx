import {
  makeStyles,
  createStyles,
  Theme,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { MainCategories } from "../../../config";
import { useIsMobile } from "../../../utils/isMobile";
import { FilterList } from "@material-ui/icons";
import { FilterCardModal } from "./filterCard.modal";

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
export const ProjectsSearchBarDropdown = ({
  category,
  setCategory,
  openModal,
}: {
  category: string | undefined;
  setCategory: (category: string) => any;
  openModal: () => void;
}) => {
  const isMobile = useIsMobile();
  const defaultOptions = [
    { value: "technology", tag: "Technology" },
    { value: "community", tag: "Community" },
    { value: "creative", tag: "Creative" },
  ];
  const [options, setOptions] = useState(defaultOptions);
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();
  const defaultOption = isMobile ? "All Categories" : "All Categories";

  return isMobile ? (
    <div>
      <Button onClick={openModal}>
        <FilterList />
      </Button>
    </div>
  ) : (
    <select className={classes.root}>
      <option value="">{defaultOption}</option>
      {options.map((o) => (
        <option value={o.value} style={{ textTransform: "capitalize" }}>
          {o.tag}
        </option>
      ))}
    </select>
  );
};
