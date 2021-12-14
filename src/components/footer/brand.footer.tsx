import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { BrandLogoSalmon } from "../../static/icons/brand-logo.salmon";
import { GetClasses } from "./classes.footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    icon: {
      width: "80px",
      height: "58px",
      paddingBottom: "41px",
    },
    span: {
      maxWidth: "500px",
    },
  })
);
export const FooterBrand = () => {
  const classes = useStyles();
  const genericClasses = GetClasses();
  const spanStyle = { maxWidth: "470px" };
  return (
    <div className={classes.root}>
      <BrandLogoSalmon className={classes.icon} />
      <Typography
        variant="body1"
        component="span"
        className={genericClasses.span}
        style={spanStyle}
      >
        UP is an open community support and development platform, empowering an
        open environment for feeless donations and project promotion powered by
        IOTA.
      </Typography>
    </div>
  );
};
