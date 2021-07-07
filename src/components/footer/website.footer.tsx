import { Typography } from "@material-ui/core";
import { GetClasses } from "./classes.footer";
import { Link } from "react-router-dom";
import { MyLink } from "./myLink.footer";
import { getCategoryPath } from "./utils/getCategoryPath";

export const FooterWebsite = () => {
  const classes = GetClasses();
  const entries = ["About Us", "UP Explorer", "Creators", "Contact"];
  return (
    <div className={classes.category}>
      <Link to="/website" className={classes.link}>
        <Typography variant="h2" component="h2" className={classes.h2}>
          Website
        </Typography>
      </Link>

      {entries.map((c) => (
        <MyLink classes={classes} path={getCategoryPath(c)} title={c} />
      ))}
    </div>
  );
};
