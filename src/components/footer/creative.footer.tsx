import { Typography } from "@material-ui/core";
import { GetClasses } from "./classes.footer";
import { LinkToTop } from "../LinkToTop/LinkToTop";
import { MyLink } from "./myLink.footer";
import { getCategoryPath } from "./utils/getCategoryPath";

export const FooterCreative = () => {
  const classes = GetClasses();
  const entries = [
    "Art",
    "Design",
    "Film",
    "Games",
    "Journalism",
    "Performance",
    "Writing",
  ];
  return (
    <div className={classes.category}>
      <LinkToTop to="/creative" className={classes.link}>
        <Typography variant="h2" component="h2" className={classes.h2}>
          Creative
        </Typography>
      </LinkToTop>

      {entries.map((c) => (
        <MyLink classes={classes} path={getCategoryPath(c)} title={c} />
      ))}
    </div>
  );
};
