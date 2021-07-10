import { Typography, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: "250px",
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
    preHeader: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "30px",
      textAlign: "center",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "75px",
      textAlign: "center",
    },
    subHeader: {},
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
    },
    card: {},
    cards: {},
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
  const cards = [{ title: "Firefly Wallet", icon: "", description: "" }];
  return (
    <div className={classes.root}>
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
        {cards.map((c) => (
          <AboutUsCard card={c} />
        ))}
      </div>
    </div>
  );
};

interface IAboutUsCardProps {
  card: any;
}
const AboutUsCard = (props: IAboutUsCardProps) => {
  const { card } = props;
  const classes = useStyles();

  return <div className={classes.card}></div>;
};
