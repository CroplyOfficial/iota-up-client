import { LinkToTop } from "../LinkToTop/LinkToTop";
import { Typography } from "@material-ui/core";
interface IMyLinkProps {
  classes: any;
  path: string;
  title: string;
}
export const MyLink = (props: IMyLinkProps) => (
  <LinkToTop
    to={props.path}
    className={props.classes.link}
    style={{ paddingBottom: "10px" }}
  >
    <Typography variant="body1" component="span" className={props.classes.span}>
      {props.title}
    </Typography>
  </LinkToTop>
);
