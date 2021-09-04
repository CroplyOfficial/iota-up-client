import {
  createStyles,
  makeStyles,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  Theme,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
  CardContent,
  Card,
  Checkbox,
} from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { useState } from "react";
import { useIsMobile } from "../../../utils/isMobile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "100vw",
      height: "calc(100vh - 74px)",
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "fixed",
      zIndex: 10,
      top: "74px",
      left: 0,
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    card: {
      width: "650px",
      backgroundColor: "#f5f5f5",
      zIndex: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      borderRadius: "15px",
      padding: "15px",
      paddingBottom: "20px",
      paddingTop: "20px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "100%",
      },
    },
    cardContent: {
      minHeight: "400px",
      overflow: "scroll",
    },
    header: {
      textAlign: "center",
      fontSize: "50px",
      lineHeight: "75px",
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      paddingBottom: "15px",
      color: "black",
      [theme.breakpoints.down("sm")]: {
        fontSize: "32px",
        lineHeight: "40px",
      },
    },
    body: {
      minHeight: "400px",
      fontSize: "15px",
      lineHeight: "28px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    footer: {
      display: "flex",
      width: "100%",
      flexDirection: "row-reverse",
      gap: "25px",
    },
    button: {
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      padding: "10px",
      paddingLeft: "30px",
      paddingRight: "30px",
      borderRadius: "10px",
    },
    textField: {
      width: "250px",
    },
    textArea: {
      width: "90%",
      height: "100px",
      fontFamily: "Poppins",
      resize: "none",
    },
    label: {
      fontFamily: "Poppins",
      fontSize: "18px",
      lineHeight: "27px",
      fontWeight: 400,
      fontStyle: "normal",
      color: theme.palette.text.secondary,
    },
    select: {
      width: "250px",
    },
    chips: {
      display: "flex",
      gap: "10px",
    },
    chip: {},
    saveButton: {
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      padding: "10px",
      paddingLeft: "30px",
      paddingRight: "30px",
      borderRadius: "10px",

      color: "white",
    },
    rootFilter: {
      borderRadius: "10px",
      minHeight: "569px",
      [theme.breakpoints.down("sm")]: {
        height: "100vh",
        overflow: "scroll",
      },
    },
    headerFilter: {
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
      textTransform: "capitalize",
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

interface IProps {
  open: boolean;
  onClick: () => void;
  categories: any;
  setCategories: (...a: any) => any;
}
interface ICategory {
  title: string;
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export const FilterCardModal = ({
  open,
  onClick,
  categories,
  setCategories,
}: IProps) => {
  const classes = useStyles();
  const isMobile = useIsMobile();
  const initialThreshold = isMobile ? 3 : 5;
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
    <div>
      {open && (
        <>
          <div className={classes.modal}>
            <div className={classes.card}>
              <div className={classes.body}>
                <Card className={classes.rootFilter} variant="outlined">
                  <CardContent className={classes.cardContent}>
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
                          <Typography className={classes.text}>
                            {c.title}
                          </Typography>
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
                        See{" "}
                        {visibleCategories.length <= initialThreshold
                          ? "more"
                          : "less"}{" "}
                        categories
                      </Button>
                      <hr
                        className={classes.hr}
                        style={{ marginBottom: "50px" }}
                      />
                      <Button
                        className={classes.button2}
                        color="primary"
                        variant="contained"
                        onClick={onClickButton2}
                      >
                        Update Results
                      </Button>
                      <Button
                        className={classes.button2}
                        style={{ marginTop: "15px" }}
                        color="secondary"
                        variant="outlined"
                        onClick={onClick}
                      >
                        Close
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className={classes.footer}></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
