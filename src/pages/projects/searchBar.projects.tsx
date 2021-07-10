import { Typography, makeStyles, createStyles, Theme } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {},
    input: {},
  })
);

interface ISearchBarProps {
  onChange: () => void;
}
export const ProjectsSearchBar = (props: ISearchBarProps) => {
  const { onChange } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <input className={classes.input} onChange={onChange} />
    </div>
  );
};
