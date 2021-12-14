import { createStyles, makeStyles } from "@material-ui/core";

interface IProps {
  onClick: () => void;
  onScroll: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    progressBar: {},
  })
);
export const ProgressBar = (props: IProps) => {
  const { onClick, onScroll } = props;
  const classes = useStyles();
  return <div></div>;
};
