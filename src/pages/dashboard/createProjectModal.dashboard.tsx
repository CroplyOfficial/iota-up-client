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
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { MainCategories } from "../../config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "fixed",
      zIndex: 10,
      top: 0,
      left: 0,
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
      [theme.breakpoints.down("sm")]:{
        width: "80%",
      }
    },
    header: {
      textAlign: "center",
      fontSize: "50px",
      lineHeight: "75px",
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      paddingBottom: "15px",
      color: "black",
      [theme.breakpoints.down("sm")]:{
        fontSize: "32px",
        lineHeight: "40px",
      }
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
      width: "90%",
      height: "100px",
      fontFamily: "Poppins",
      resize: "none",
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
export const DashboardCreateProjectModal = ({ showing, onClick }: IProps) => {
  const userMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userMeta;

  const handleProjectCreation = async () => {
    if (userInfo) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const projectCreated: any = await axios.post(
        "/api/projects",
        {
          name: title,
          desc: description,
          wallet: walletAdress,
          category: categories,
        },
        config
      );
      console.log(projectCreated);
      window.location.href = `/project/${projectCreated.data._id}`;
    }
  };

  const classes = useStyles();
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
  const [walletAdress, setWalletAdress] = useState<string>("");
  const handleWallet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAdress(e.currentTarget.value);
  };
  const allCategories = ["Technology", "Community", "Theater"];
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
                rows={10}
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
                  {Object.values(MainCategories)
                    .reduce((arr: string[], cur: string[]) => {
                      return arr.concat(cur);
                    }, [])
                    .map((c) => (
                      <MenuItem
                        style={{ textTransform: "capitalize" }}
                        value={c.toLowerCase()}
                      >
                        {c}
                      </MenuItem>
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

              <Typography className={classes.label}>Wallet Adress</Typography>
              <TextField
                value={walletAdress}
                onChange={handleWallet}
                placeholder="iota:12312"
                label={"IOTA Wallet Adress"}
                className={classes.textField}
              />
            </div>

            <div className={classes.footer}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleProjectCreation}
                className={classes.button}
              >
                Create
              </Button>
              <Button
                variant="contained"
                onClick={onClick}
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
