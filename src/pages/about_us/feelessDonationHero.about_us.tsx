import {
  Typography,
  makeStyles,
  SvgIcon,
  createStyles,
  Theme,
} from "@material-ui/core";
import { AboutUsHeroCard } from "./heroCard.about_us";
import { Container } from "../../components/container/container";
import { MyBook } from "../../static/icons/book";
import { VrGlasses } from "../../static/icons/vrGlasses";
import { Transformation } from "../../static/icons/transformation";
import { DoctorBag } from "../../static/icons/doctorBag";
import FireflyLogo from "../../static/images/firefly.png";
import { useHistory, Redirect } from "react-router-dom";
import { DashboardCreateProjectModal } from "../dashboard/createProjectModal.dashboard";
import { useState } from "react";
import { ReactComponent as Create } from "../../static/images/icons/create.svg";
import { ReactComponent as Explore } from "../../static/images/icons/explore.svg";
import { ReactComponent as UpButton } from "../../static/images/icons/up.svg";
import {useIsMobile} from "../../utils/isMobile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "400px",
      width: "100%",
      minHeight: "100vh",
      display: "block",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "30px",
      },
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
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
        lineHeight: "30px",
      },
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
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
        lineHeight: "28px",
        textAlign: "start",
      },
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
    disclaimer: {
      fontSize: "0.85rem",
      color: "#515151",
    },
    alignStart: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "start",
        fontSize: "12px",
        lineHeight: "20px",
        fontStyle: "italic",
        paddingBottom: "15px",
      },
    },
  })
);
export const AboutUsFeelessDonationsHero = () => {
  const classes = useStyles();
  const isMobile = useIsMobile();

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
  const subHeaderMobile = (
    <span>
      Our platform makes use of the IOTA network. Allowing donors to make
      payments direct to project creators.
      <br/><br/>
      Making use of IOTA as a payment allows feeless, near instant transactions,
      so you can be safe in the
      knowledge that your support gets delivered direct to the hands of those
      who need it.
    </span>
  );
  const footer = (
    <div className={classes.alignStart}>
      It is important to be aware that this is an open platform, built for
      community support and development. <br />
      It is the responsibility of all creators to provide honest projects and
      updates, and it is the responsibility of <br />
      the donors to make their own judgements on whether they choose to support
      a project or not.
    </div>
  );
  const footerMobile = (
    <div className={classes.alignStart}>
      It is important to be aware that this is an open platform, built community support and development. It is the responsibility of all creators to provide honest projects and updates, and it is the responsibility of the donors to make their own judgements on whether they choose to support a project or not.
    </div>
  );
  const history = useHistory();
  const [redirect, setRedirect] = useState<string>("");
  const [showingModal, setShowingModal] = useState<boolean>(false);
  const toggleShowModal = () => {
    setShowingModal(!showingModal);
  };
  const cards = [
    {
      header: "Firefly Wallet",
      icon: <img className={classes.icon} src={FireflyLogo} />,
      subHeader:
        "To send and receive donations, it is recommended to use the official IOTA Firefly Wallet. This can be downloaded here.",
      onClick: () => {
        window.location.href = "https://firefly.iota.org/";
      },
    },
    {
      header: "Create Your Project",
      subHeader:
        "Sign up to the system. Create your profile. Create your project. Share. It’s that simple to start building UP.",
      icon: (
        <SvgIcon color="primary" className={classes.icon}>
          <Create />
        </SvgIcon>
      ),
      onClick: () => {
        toggleShowModal();
      },
    },
    {
      header: "Explore Projects",
      subHeader:
        "All projects are open and visible to everyone. Explore the opportunities, challenges, and innitiatives that you feel warrant your support.",
      icon: (
        <SvgIcon color="primary" className={classes.icon}>
          <Explore />
        </SvgIcon>
      ),
      onClick: () => {
        history.push("/projects");
      },
    },
    {
      header: "UP & Donate",
      subHeader:
        "UP vote the projects you think are worthy of support. Click donate to send what you feel you can. All transfers go direct from you to the creator, no inbetweens.",
      icon: (
        <SvgIcon color="primary" className={classes.icon}>
          <UpButton />
        </SvgIcon>
      ),
      onClick: () => {
        history.push("/projects");
      },
    },
  ];
  return (
    <div className={classes.root}>
      <DashboardCreateProjectModal
        showing={showingModal}
        onClick={toggleShowModal}
      />
      <Container>
        <Typography variant="h6" className={classes.preHeader} color="primary">
          {preHeader}
        </Typography>
        <Typography variant="h2" className={classes.header}>
          {header}
        </Typography>
        <Typography variant="h6" className={classes.openSans400Small}>
          {!isMobile ? subHeader: subHeaderMobile}
        </Typography>

        <div className={classes.cards}>
          {cards.map((c, i) => (
            <AboutUsHeroCard
              key={"about-us-hero-card#" + i++}
              header={c.header}
              subHeader={c.subHeader}
              variant="outlined"
              icon={c.icon}
              onClick={c.onClick}
            />
          ))}
        </div>
        <Typography
          variant="h6"
          component="span"
          className={classes.disclaimer}
        >
          {isMobile ? footerMobile : footer}
        </Typography>
      </Container>
    </div>
  );
};
