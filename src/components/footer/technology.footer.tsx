import { Typography } from "@material-ui/core";
import { GetClasses } from "./classes.footer";
import { Link } from "react-router-dom";
import { MyLink } from "./myLink.footer";
import { getCategoryPath } from "./utils/getCategoryPath";

export const FooterTechnology = () => {
  const classes = GetClasses();
  const entries = [
    "Applications",
    "Green Tech",
    "Hardware",
    "Research",
    "Software",
    "Websites",
  ];
  return (
    <div className={classes.category}>
      <Link to="/technology" className={classes.link}>
        <Typography variant="h2" component="h2" className={classes.h2}>
          Technology
        </Typography>
      </Link>

      {entries.map((c) => (
        <MyLink classes={classes} path={getCategoryPath(c)} title={c} />
      ))}
    </div>
  );
};
