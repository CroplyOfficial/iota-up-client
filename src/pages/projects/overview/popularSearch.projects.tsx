import { Typography, makeStyles, createStyles, Theme } from "@material-ui/core";
import { Container } from "../../../components/container/container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingBottom: "5rem",
    },
    text: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
    },
    textGreen: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
    wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      paddingLeft: "250px",
      paddingRight: "250px",
    },
  })
);
interface ITag {
  title: string;
  onClick: () => void;
}
interface IProps {
  tags: ITag[];
}
export const ProjectsPopularSearch = (props: IProps) => {
  const {
    tags = [
      { title: "Technology Projects", onClick: () => null },
      { title: "Charity Programs", onClick: () => null },
      { title: "Community Website", onClick: () => null },
    ],
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <div className={classes.wrapper}>
          <span className={classes.text}>Popular Search:</span>
          {tags.map((t, i) => (
            <span
              onClick={t.onClick}
              className={classes.textGreen}
              key={"popular-search-tag#" + i++}
            >
              {t.title}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
};
