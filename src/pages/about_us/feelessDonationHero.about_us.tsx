import { Typography, makeStyles, createStyles } from "@material-ui/core";
import { AboutUsHeroCard } from "./heroCard.about_us";
import { Container } from "../../components/container/container";
import { MyBook } from "../../static/icons/book";
import { VrGlasses } from "../../static/icons/vrGlasses";
import { Transformation } from "../../static/icons/transformation";
import { DoctorBag } from "../../static/icons/doctorBag";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: "400px",
      width: "100%",
      height: "100vh",
      display: "block",
      textAlign: "center",
    },
    preHeader: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "30px",
      textAlign: "center",
      paddingBottom: "15px",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "75px",
      textAlign: "center",
      paddingBottom: "15px",
    },
    poppins800Large: {
      fontFamily: "Poppins",
      fontWeight: 800,
      fontStyle: "normal",
      fontSize: "24px",
      lineHeight: "36px",
    },
    openSans400Small: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
      textAlign: "center",
    },
    cards: {
      paddingTop: "35px",
      flexDirection: "row",
      display: "flex",
      maxWidth: "1619px",
      flexWrap: "wrap",
      "& > *": {
        paddingBottom: "35px",
        textAlign: "start",
      },
      justifyContent: "space-around",
      paddingBottom: "35px",
    },
    icon: {
      width: "50px",
      height: "50px",
    },
  })
);
export const AboutUsFeelessDonationsHero = () => {
  const classes = useStyles();

  const preHeader = "THE SYSTEM";
  const header = "Feeless Donations. Direct.";
  const subHeader = (
    <span>
      Our platform makes use of the IOTA network. Allowing donors to make
      payments direct to project creators. <br />
      Making use of IOTA as a payment allows feeless, near instant transactions,
      so you can be safe in the <br />
      knowledge that your support gets delivered direct to the hands of those
      who need it.
    </span>
  );
  const footer = (
    <span>
      It is important to be aware that this is an open platform, built for
      community support and development. <br />
      It is the responsibility of all creators to provide honest projects and
      updates, and it is the responsibility of <br />
      the donors to make their own judgements on whether they choose to support
      a project or not.
    </span>
  );
  const cards = [
    {
      header: "Firefly Wallet",
      icon: <MyBook color="primary" className={classes.icon} />,
      subHeader:
        "To send and receive donations, it is recommended to use the official IOTA Firefly Wallet. This can be downloaded here.",
    },
    {
      header: "Create Your Project",
      subHeader:
        "Sign up to the system. Create your profile. Create your project. Share. It’s that simple to start building UP.",
      icon: <VrGlasses color="primary" className={classes.icon} />,
    },
    {
      header: "Exploring Projects",
      subHeader:
        "All projects are open and visible to everyone. Explore the opportunities, challenges, and innitiatives that you feel warrant your support.",
      icon: <Transformation color="primary" className={classes.icon} />,
    },
    {
      header: "UP & Donate",
      subHeader:
        "UP vote the projects you think are worthy of support. Click donate to send what you feel you can. All transfers go direct from you to the creator, no inbetweens.",
      icon: <DoctorBag color="primary" className={classes.icon} />,
    },
  ];
  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h6" className={classes.preHeader} color="primary">
          {preHeader}
        </Typography>
        <Typography variant="h2" className={classes.header}>
          {header}
        </Typography>
        <Typography variant="h6" className={classes.openSans400Small}>
          {subHeader}
        </Typography>

        <div className={classes.cards}>
          {cards.map((c, i) => (
            <AboutUsHeroCard
              key={"about-us-hero-card#" + i++}
              header={c.header}
              subHeader={c.subHeader}
              variant="outlined"
              icon={c.icon}
            />
          ))}
        </div>
        <Typography
          variant="h6"
          component="span"
          className={classes.openSans400Small}
        >
          {footer}{" "}
        </Typography>
      </Container>
    </div>
  );
};
