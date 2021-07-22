import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      zIndex: 2,
    },
  })
);

interface IProps {
  showing: boolean;
}
export const DashboardDeleteModal = (props: IProps) => {
  const classes = useStyles();
  const { showing } = props;
  return <div>{showing && <div className={classes.modal}></div>}</div>;
};
