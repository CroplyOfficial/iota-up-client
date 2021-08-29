import {
  createStyles,
  makeStyles,
  Typography,
  TextField,
  Button,
  Chip,
  Theme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  GoogleLoginButton,
  LinkedInLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import { RootState } from "../../store";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { IProject } from "../../interfaces/project.interface";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "100vw",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 3,
    },
    background: {
      width: "100%",
      height: "100%",
      position: "relative",
      top: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    card: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      maxHeight: "400px",
      background: "white",
      borderRadius: "10px",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      }
    },
    button: {},
    header: {
      height: "10%",
      textAlign: "center",
      padding: "10px",
    },
    body: {
      maxHeight: "700px",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      justifyContent: "center",
      alignItems: "start",
    },
    footer: {
      height: "10%",
      padding: "10px",
      display: "flex",
      flexDirection: "row-reverse",
      gap: "10px",
      width: "calc(100% - 20px)",
    },
    title: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "26px",
      lineHeight: "35px",
    },
    input: {
      width: "100%",
    },
    projectName: {
      borderRadius: 0,
      position: "relative",
      textTransform: "none",
      "&:hover  .MuiChip-root": {
        opacity: 1,
        animation: `$fade 500ms ${theme.transitions.easing.easeInOut}`,
      [theme.breakpoints.down("sm")]:{
      }
      },
    },
    copy: {},
    chip: {
      opacity: 0,
      position: "absolute",
      top: 0,
      right: 0,
      transform: "translate(-10px,25%)",
      "& > *": {
        fontSize: "10px",
      },
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        transform: "translate(0,0)",
      }
    },
    "@keyframes fade": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
  })
);
interface IProps {
  onClick: () => void;
  project: IProject;
}
export const VerifyDeleteProjectModal = (props: IProps) => {
  const { onClick, project } = props;
  const classes = useStyles();
  const [input, setInput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(project.name);
    setCopied(true);
  };
  const history = useHistory();
  const userLoginMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userLoginMeta;

  const handleDelete = async () => {
    const { _id } = project;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/projects/by-id/${_id}`, config);
    onClick();
    history.push("/dashboard/projects");
  };

  useEffect(() => {
    if (!copied) return;

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [copied]);
  return (
    <div className={classes.modal}>
      <div className={classes.background} onClick={onClick}></div>
      <div className={classes.card}>
        <header className={classes.header}>
          <Typography className={classes.title}>Delete Project</Typography>
        </header>

        <section className={classes.body}>
          <Typography>
            This will delete the project. All data will be lost. This action is
            irreversible. Do you wish to proceed? Please confirm by entering the
            project name.
          </Typography>
          <Button
            className={`${classes.input} ${classes.projectName}`}
            onClick={handleCopy}
            variant="outlined"
            endIcon={
              <Chip
                label="copy"
                className={classes.chip}
                size="small"
                onClick={handleCopy}
                color={copied ? "primary" : ("" as any)}
              />
            }
          >
            <div>{project.name}</div>
          </Button>

          <TextField
            autoFocus
            placeholder={project.name}
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.currentTarget.value)
            }
            {...(input.length && input !== project.name
              ? { error: true, helperText: "Input doesn't match" }
              : { error: false })}
            label="Project Name"
            className={classes.input}
            variant="outlined"
          />
        </section>
        <footer className={classes.footer}>
          {input === project.name ? (
            <Button
              color={"secondary"}
              variant="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>
          ) : (
            <Button variant="contained" disabled onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button onClick={onClick} variant="contained">
            Cancel
          </Button>
        </footer>
      </div>
    </div>
  );
};
