import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Box,
} from "@material-ui/core";
import { Container } from "../../components/container/container";
import BlueGreenGuru from "../../static/images/green_floating_guru.png";
import {useIsMobile} from "../../utils/isMobile";

const imageSource = "https://source.unsplash.com/random";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      width: "100vw",
      height: "852px",
      maxHeight: "852px",
    },
    wideCard: {
      width: "100%",
      height: "852px",
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
      transform: "translateY(20%)",
      WebKitFilter: "drop-shadow(1px 10px 4px rgba(0,0,0,0.3))",
      MozFilter: "drop-shadow(1px 10px 4px rgba(0,0,0,0.3))",
      MsFilter: "drop-shadow(1px 10px 4px rgba(0,0,0,0.3))",
      OFilter: "drop-shadow(1px 10px 4px rgba(0,0,0,0.3))",
      filter: "drop-shadow(1px 10px 10px rgba(0,0,0,0.3))",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        transform: "translateY(0)",
        WebKitFilter: "drop-shadow(1px 10px 4px rgba(0,0,0,0))",
        MozFilter: "drop-shadow(1px 10px 4px rgba(0,0,0,0))",
        MsFilter: "drop-shadow(1px 10px 4px rgba(0,0,0,0))",
        OFilter: "drop-shadow(1px 10px 4px rgba(0,0,0,0))",
        filter: "drop-shadow(1px 10px 10px rgba(0,0,0,0))",
      },
    },
    left: {
      width: "75.5%",
      height: "100%",
      backgroundColor: "#ffffff",
      borderRadius: "20px 0 0 20px",
      [theme.breakpoints.down("sm")]: {
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        display: "none",
      },
      /*
      maskImage: `url(${imageSource})`,
      WebKitMaskImage: `url(${imageSource})`,
       */
    },
    imageWrapper: {
      position: "absolute",
      top: 0,
      transform: "translate(-42%,-2%)",
      zIndex: 1,
      backgroundSize: "150%",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    right: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      backgroundColor: "#ffffff",
      width: "70%",
      padding: "75px",
      paddingTop: "10%",
      borderRadius: "0 20px 20px 0",
      textAlign: "end",
      [theme.breakpoints.down("sm")]: {
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        alignItems: "flex-start",
        width: "100%",
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    title: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "40px",
      lineHeight: "75px",
      flexGrow: 0.4,
      [theme.breakpoints.down("sm")]: {
        textAlign: "start",
        fontSize: "26px",
        lineHeight: "32px",
      },
    },
    description: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
      color: theme.palette.text.secondary,
      flexGrow: 2,
      textAlign: "start",
      width: "90%",
      paddingTop: "10px",
      [theme.breakpoints.down("sm")]: {
        color: "white",
        lineHeight: "24px",
        fontStyle: "italic"
      }
    },
    footer: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
      flexGrow: 0.5,
      [theme.breakpoints.down("sm")]: {
        textAlign: "start",
        color: "white",
        fontWeight: 700
      }
    },
    image: {
      WebKitMaskBoxImage: `url(${imageSource})`,
      maskImage: `url(${imageSource})`,
    },
  })
);

export const AboutUsDonateHero = () => {
  const isMobile = useIsMobile();
  const classes = useStyles();
  const title = (
    <span>
      Donating is the gentle art of
      learning the joy of giving
    </span>
  );
  const description = `Giving is not just about making a donation, it???s about making a difference. Working in technology and agriculture, focusing on the bottom billion, we regularly see that one of the biggest challenges facing creators and innovators around the world is the lack of support in the early stages of creation. Whether it???s building a website, concept, or community development, access to support can be hard to establish.
UP is all about providing a platform for change. Providing the opportunity for individuals, groups, communities, and everyone in between to share their work on an open, feeless platform. that can allow community supporters the ability to decide if they wish to support and make a change. `;


  const descriptionMobile = <div><span>Giving is not just about making a donation, it???s about making a difference. Working in technology and agriculture, focusing on the bottom billion, we regularly see that one of the biggest challenges facing creators and innovators around the world is the lack of support in the early stages of creation. Whether it???s building a website, concept, or community development, access to support can be hard to establish.</span><br/><br/><span>
UP is all about providing a platform for change. Providing the opportunity for individuals, groups, communities, and everyone in between to share their work on an open, feeless platform. that can allow community supporters the ability to decide if they wish to support and make a change.
  </span></div>;
  const footer = (
    <span>
      Adam Eunson <br />
      Founder of Croply
    </span>
  );
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.wideCard}>
          <div className={classes.left}>
            <div className={classes.imageWrapper}>
              <img
                src={BlueGreenGuru}
                style={{ width: "130%", height: "auto" }}
              />
            </div>
          </div>
          <div className={classes.right}>
            <Typography variant="h2" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="h2" className={classes.description}>
              {isMobile ? descriptionMobile : description}
            </Typography>
            <Typography variant="h2" className={classes.footer}>
              {footer}
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
};
