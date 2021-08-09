import { Typography } from "@material-ui/core";
import { GetClasses } from "./classes.footer";
import { Link } from "react-router-dom";
import { MyLink } from "./myLink.footer";
import { getCategoryPath } from "./utils/getCategoryPath";

export const FooterWebsite = () => {
  const classes = GetClasses();
  const paths = [
    { title: "About Us", path: "/about" },
    { title: "Projects", path: "/projects" },
    //{ title: "Creators", path: "/creators" },
    { title: "Contact", path: "/contact" },
  ];
  return (
    <div className={classes.category}>
      <Link to="/website" className={classes.link}>
        <Typography variant="h2" component="h2" className={classes.h2}>
          Website
        </Typography>
      </Link>

      {paths.map((p) => (
        <MyLink classes={classes} path={p.path} title={p.title} />
      ))}
    </div>
  );
};
