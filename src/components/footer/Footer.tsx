import { createStyles, Typography, makeStyles, Theme } from "@material-ui/core";
import { FooterBrand } from "./brand.footer";
import { FooterSubHeader } from "./subHeader.footer";
import { FooterCommunity } from "./community.footer";
import { FooterCreative } from "./creative.footer";
import { FooterTechnology } from "./technology.footer";
import { FooterWebsite } from "./website.footer";
import { Container } from "../container/container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#121E31",
      color: theme.palette.getContrastText("#121E31"),
    },
    level: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-around",
      maxHeight: "350px",
      paddingTop: "75px",
      [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      maxHeight: "1200px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: "3rem",
      }
      },
    },
  })
);

export const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <div id="level" className={classes.level}>
          <FooterBrand />
          <FooterCommunity />
          <FooterCreative />
          <FooterTechnology />
          <FooterWebsite />
        </div>
        <FooterSubHeader />
      </Container>
    </div>
  );
};
