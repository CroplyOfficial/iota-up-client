import { useState } from "react";
import {
  makeStyles,
  createStyles,
  Card,
  CardContent,
  Typography,
  Checkbox,
  Button,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius: "10px",
    },
    header: {
      fontFamily: "Poppins",
      fontSize: "20px",
      lineHeight: "30px",
      fontWeight: 700,
      fontStyle: "normal",
      paddingBottom: "25px",
      paddingLeft: "15px",
      paddingTop: "10px",
    },
    text: {
      fontFamily: "Poppins",
      fontSize: "18px",
      lineHeight: "27px",
      fontWeight: 500,
      fontStyle: "normal",
    },
    showMoreCategoriesText: {
      fontFamily: "Open Sans",
      fontSize: "16px",
      lineHeight: "28px",
      fontWeight: 400,
      fontStyle: "normal",
    },
    categoryWrapper: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "15px",
      cursor: "pointer",
    },
    button1: {
      fontFamily: "Open Sans",
      fontSize: "16px",
      lineHeight: "28px",
      fontWeight: 400,
      fontStyle: "normal",

      textTransform: "none",
    },
    button2: {
      fontFamily: "Poppins",
      fontSize: "18px",
      lineHeight: "27px",
      fontWeight: 700,
      fontStyle: "normal",
      width: "100%",
      padding: "15px",
    },
    buttons: {},
    hr: {
      border: "0.05px solid rgba(0,0,0,0.05)",
    },
  })
);
interface ICategory {
  title: string;
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
export const ProjectsFilterCard = () => {
  const classes = useStyles();

  /* HELPERS */
  const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const categoryIndex = categories.findIndex((c) => c.title === value);
    if (categoryIndex < 0) return;
    const newCategories = [...categories];
    newCategories[categoryIndex].checked =
      !newCategories[categoryIndex].checked;
    setCategories(categories);
  };
  /* HELPERS */

  const initialThreshold = 5;
  const [categories, setCategories] = useState<ICategory[]>([
    {
      title: "All Projects",
      onClick,
      checked: true,
    },
    { title: "Technology", onClick, checked: false },
    { title: "Film", onClick, checked: false },
    { title: "Business", onClick, checked: false },
    { title: "Design", onClick, checked: false },
    { title: "Design2", onClick, checked: false },
  ]);
  const [visibleCategories, setVisibleCategories] = useState<ICategory[]>(
    categories.slice(0, initialThreshold)
  );
  const onClickButton1 = () => {
    visibleCategories.length <= initialThreshold
      ? setVisibleCategories(categories)
      : setVisibleCategories(categories.slice(0, initialThreshold));
  };
  const onClickButton2 = () => null;
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.header}
          variant="h4"
          color="textSecondary"
        >
          Category
        </Typography>
        {visibleCategories.map((c, i) => (
          <div>
            <div
              className={classes.categoryWrapper}
              key={"filter-category#" + i++}
            >
              <Checkbox
                checked={c.checked}
                onChange={c.onClick}
                inputProps={{ "aria-label": "primary checkbox" }}
                color="primary"
                value={c.title}
              />
              <Typography className={classes.text}>{c.title}</Typography>
            </div>
            <hr className={classes.hr} />
          </div>
        ))}

        <div className={classes.buttons}>
          <Button
            className={classes.button1}
            color="primary"
            endIcon={
              visibleCategories.length <= initialThreshold ? (
                <ExpandMore style={{ fontSize: "45px" }} />
              ) : (
                <ExpandLess style={{ fontSize: "45px" }} />
              )
            }
            onClick={onClickButton1}
          >
            See {visibleCategories.length <= initialThreshold ? "more" : "less"}{" "}
            categories
          </Button>
          <hr className={classes.hr} style={{ marginBottom: "50px" }} />
          <Button
            className={classes.button2}
            color="primary"
            variant="contained"
            onClick={onClickButton2}
          >
            Update Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
