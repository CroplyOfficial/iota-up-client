import React from "react";
import {
  createStyles,
  makeStyles,
  Typography,
  Card as MaterialCard,
} from "@material-ui/core";
import { ICard } from "../../../interfaces/categoriesCard.interface";
import { Link } from "react-router-dom";

type stringOrHtml = string | React.ReactNode;
interface IProps {
  preHeader: string;
  title: stringOrHtml;
  subHeader: stringOrHtml;
  cards: Array<ICard>;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "150px",
      paddingBottom: "150px",
    },
    categoriesPreHeader: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "30px",
      textAlign: "center",
    },
    categoriesTitle: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "75px",
      paddingTop: "24px",
      textAlign: "center",
    },
    categoriesSubHeader: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
      paddingTop: "24px",
      textAlign: "center",
    },
    cards: {
      width: "100%",
      paddingTop: "48px",
      display: "flex",
      flexDirection: "row",
      overflowX: "scroll",
      gap: "25px",
      padding: "5px",
      paddingBottom: "25px",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {},
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "25px",
        backgroundColor: "#EEEEEE",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "rgba(0,0,0,.15)",
        transition: "all 5s ease",
        MozTransition: "all 5s ease",
        WebkitTransition: "all 5s ease",
        OTransition: "all 5s ease",
      },
    },
    card: {
      width: "243.33px",
      height: "243.33px",
      WebkitBoxShadow:
        "3px 3px 5px 6px #f5f5f5" /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */,
      MozBoxShadow: "3px 3px 5px 6px #f5f5f5" /* Firefox 3.5 - 3.6 */,
      boxShadow:
        "3px 3px 5px 6px #f5f5f5" /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */,
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      "&:hover": {
        WebkitBoxShadow:
          "3px 3px 5px 6px rgba(0, 0, 0, .1)" /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */,
        MozBoxShadow:
          "3px 3px 5px 6px rgba(0, 0, 0, .1)" /* Firefox 3.5 - 3.6 */,
        boxShadow:
          "3px 3px 5px 6px rgba(0, 0, 0, .1)" /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */,
      },
    },
    cardIcon: {},
    cardTitle: {
      paddingTop: "18px",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
    },
  })
);
export const Categories = (props: IProps) => {
  const { preHeader, title, subHeader, cards } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        variant="h6"
        component="span"
        color="primary"
        className={classes.categoriesPreHeader}
      >
        {preHeader.toUpperCase()}
      </Typography>
      <Typography variant="h3" className={classes.categoriesTitle}>
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="span"
        className={classes.categoriesSubHeader}
      >
        {subHeader}
      </Typography>
      <div className={classes.cards}>
        {cards.map((c) => (
          <Card card={c} />
        ))}
      </div>
    </div>
  );
};

interface ICardProps {
  card: ICard;
}
const Card = (props: ICardProps) => {
  const { card } = props;
  const { title, icon } = card;
  const classes = useStyles();
  return (
    <Link to={`/` + title} style={{ textDecoration: "none" }}>
      <MaterialCard className={classes.card}>
        <div className={classes.cardIcon}>{icon}</div>
        <Typography
          variant="body2"
          component="span"
          className={classes.cardTitle}
        >
          {title}
        </Typography>
      </MaterialCard>
    </Link>
  );
};
