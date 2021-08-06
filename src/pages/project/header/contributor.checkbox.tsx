import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { IProject } from "../../../interfaces/project.interface";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "28px",
    },
  })
);

interface IProps {
  project: IProject;
  checked: boolean;
  onChange: (e: any) => void;
}
export const ContributorCheckBox = (props: IProps) => {
  const { checked, onChange } = props;
  const classes = useStyles();
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={checked}
              onChange={onChange}
              name="checkedA"
            />
          }
          label={<span className={classes.root}>Looking For Contributors</span>}
        />
      </FormGroup>
    </div>
  );
};
