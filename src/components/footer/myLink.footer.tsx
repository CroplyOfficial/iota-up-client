import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
interface IMyLinkProps {
  classes: any;
  path: string;
  title: string;
}
export const MyLink = (props: IMyLinkProps) => (
  <Link
    to={props.path}
    className={props.classes.link}
    style={{ paddingBottom: "10px" }}
  >
    <Typography variant="body1" component="span" className={props.classes.span}>
      {props.title}
    </Typography>
  </Link>
);
