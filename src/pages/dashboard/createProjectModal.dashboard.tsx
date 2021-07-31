import {
  createStyles,
  makeStyles,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  Theme,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
} from "@material-ui/core";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "fixed",
      zIndex: 2,
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    card: {
      width: "650px",
      backgroundColor: "#f5f5f5",
      zIndex: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      borderRadius: "15px",
      padding: "15px",
      paddingBottom: "20px",
      paddingTop: "20px",
    },
    header: {
      textAlign: "center",
      fontSize: "50px",
      lineHeight: "75px",
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      paddingBottom: "15px",
    },
    body: {
      minHeight: "400px",
      fontSize: "15px",
      lineHeight: "28px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    footer: {
      display: "flex",
      width: "100%",
      flexDirection: "row-reverse",
      gap: "25px",
    },
    button: {
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      padding: "10px",
      paddingLeft: "30px",
      paddingRight: "30px",
      borderRadius: "10px",
    },
    textField: {
      width: "250px",
    },
    textArea: {
      width: "250px",
      height: "100px",
    },
    label: {
      fontFamily: "Poppins",
      fontSize: "18px",
      lineHeight: "27px",
      fontWeight: 400,
      fontStyle: "normal",
      color: theme.palette.text.secondary,
    },
    select: {
      width: "250px",
    },
    chips: {
      display: "flex",
      gap: "10px",
    },
    chip: {},
    saveButton: {
      fontSize: "18px",
      lineHeight: "27px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      padding: "10px",
      paddingLeft: "30px",
      paddingRight: "30px",
      borderRadius: "10px",

      color: "white",
    },
  })
);

interface IProps {
  showing: boolean;
  onClick: () => void;
}
export const DashboardCreateProjectModal = (props: IProps) => {
  const classes = useStyles();
  const { showing, onClick } = props;
  const handleDeleteAccount = () => null;
  const [title, setTitle] = useState<string>("");
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const handleDelete = (i: number) => {
    const newCategories = [...categories];
    newCategories.splice(i - 1, 1);
    setCategories([...newCategories]);
  };
  const handleAdd = (value: string) => {
    const newCategories = [...categories];
    if (newCategories.length === 3) return;
    newCategories.push(value);
    setCategories([...newCategories]);
  };
  const [select, setSelect] = useState<string>("");
  const allCategories = ["Technology", "Community", "Theater"];
  const handleCreateProject = () => {
    axios
      .post(`api/create`)
      .then((res) => null)
      .then((data) => {
        onClick();
      });
  };
  return (
    <div>
      {showing && (
        <div className={classes.modal}>
          <div className={classes.background} onClick={onClick}></div>
          <div className={classes.card}>
            <div className={classes.header}>Create Project</div>
            <div className={classes.body}>
              <TextField
                label="Project Title"
                className={classes.textField}
                onChange={handleTitle}
                value={title}
              />
              <Typography className={classes.label}>Description</Typography>
              <TextareaAutosize
                aria-label="empty textarea"
                cols={4}
                className={classes.textArea}
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescription(e.currentTarget.value);
                }}
                placeholder="Project description..."
              />

              <Typography className={classes.label}>Categories</Typography>
              <FormControl>
                <InputLabel>Select up to 3 categories</InputLabel>
                <Select
                  displayEmpty
                  className={classes.select}
                  value={select}
                  onChange={(e: any) => {
                    setSelect(e.target.value);
                    handleAdd(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {allCategories.map((c) => (
                    <MenuItem value={c.toLowerCase()}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className={classes.chips}>
                {categories.map((c, i) => (
                  <Chip
                    key={"chip#" + i++}
                    onDelete={() => handleDelete(i)}
                    color="primary"
                    label={c}
                    className={classes.chip}
                  />
                ))}
              </div>
            </div>
            <div className={classes.footer}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleDeleteAccount}
                className={classes.button}
              >
                Create
              </Button>
              <Button
                onClick={onClick}
                variant="contained"
                color="secondary"
                className={classes.saveButton}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
