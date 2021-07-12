import {
  makeStyles,
  createStyles,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Checkbox,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius: "10px",
      minHeight: "569px",
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
    },
    button1: {
      fontFamily: "Open Sans",
      fontSize: "16px",
      lineHeight: "28px",
      fontWeight: 400,
      fontStyle: "normal",
      paddingBottom: "50px",
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
      border: "0.05px solid rgba(0,0,0,0.1)",
    },
  })
);
export const ProjectsFilterCard = () => {
  const classes = useStyles();
  const categories = [
    { title: "All Projects", onClick: () => null },
    { title: "Technology", onClick: () => null },
    { title: "Film", onClick: () => null },
    { title: "Business", onClick: () => null },
    { title: "Design", onClick: () => null },
    { title: "All Projects", onClick: () => null },
  ];
  const visibleCategories = categories.slice(0, 5);
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
                checked={false}
                onChange={c.onClick}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Typography className={classes.text}>{c.title}</Typography>
            </div>
            <hr className={classes.hr} />
          </div>
        ))}

        <div className={classes.buttons}>
          <Button className={classes.button1} color="primary">
            See more categories
          </Button>
          <Button
            className={classes.button2}
            color="primary"
            variant="contained"
          >
            Update Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
