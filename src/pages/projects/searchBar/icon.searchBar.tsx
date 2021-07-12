import { createStyles, makeStyles, IconButton } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

const useStyles = makeStyles(() => createStyles({}));

interface IProps {
  onClick?: () => void;
}
export const ProjectsSearchBarIcon = (props: IProps) => {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <div>
      <IconButton onClick={onClick}>
        <SearchRounded color="primary" fontSize="large" />
      </IconButton>
    </div>
  );
};
