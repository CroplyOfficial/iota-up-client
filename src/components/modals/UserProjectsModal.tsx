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
  Avatar,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Facebook, LinkedIn } from "@material-ui/icons";
import { API } from "../../config";
import { IProject } from "../../interfaces/project.interface";
import { CloseSharp } from "@material-ui/icons";
import { Card2 } from "../card/card2";
import { ICreator } from "../../interfaces/creator.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "100vw",
      height: "100vh",
      overflowX: "hidden",
      position: "fixed",
      zIndex: 2,
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    level2: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    background: {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      position: "fixed",
      zIndex: 2,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    card: {
      width: "650px",
      backgroundColor: "#f5f5f5",
      zIndex: 10,
      "& > *": {
        zIndex: 15,
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      borderRadius: "15px",
      padding: "15px",
      paddingBottom: "20px",
      paddingTop: "20px",
      click: "unset",
      transform: "translate(0,35%)",
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
      fontSize: "15px",
      lineHeight: "28px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      padding: "30px",
    },
    footer: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
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
      height: "150px",
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
      width: "100%",
      marginTop: "15px",
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
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
    name: {},
    location: {},
    bio: {
      width: "100%",
      paddingBottom: "5px",
    },
    socials: {
      display: "flex",
      gap: "15px",
    },
    social: {},
    skills: {
      marginTop: "15px",
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      justifyContent: "space-around",
      gap: "15px",
    },
    projects: {
      marginTop: "10rem",
      width: "70%",
      gap: "75px",
      transform: "translate(0,75px)",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: "35vh",
    },
    level: {
      width: "100%",
      height: "100px",
      display: "flex",
      alignItems: "flex-end",
    },
    half: {
      width: "100%",
    },
    pointer: {},
    icon: {},
    justifyEnd: {
      position: "absolute",
      top: 0,
      right: 0,
      transform: "translate(0,0)",
    },
  })
);

interface IProps {
  showing: boolean;
  onClick: (e: any) => void;
  project: IProject;
}
export const UserProjectsModal = ({ showing, onClick, project }: IProps) => {
  const [creator, setCreator] = useState<ICreator>();
  console.log("", project);
  useEffect(() => {
    const tbd = async () => {
      if (project) {
        const { data } = await axios.get(
          `/api/users/overview/${project.projectAuthor}`
        );
        setCreator(data);
      }
    };
    tbd();
  }, [project]);
  const connections = ["google"];

  const fullName = creator?.displayName;
  const location =
    creator?.city &&
    creator?.country &&
    `${creator?.city}, ${creator?.country}`;
  const classes = useStyles();
  const [otherProjects, setOtherProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      if (!project?.projectAuthor) return;
      const response = await axios.get(
        `/api/projects/by-user/${project?.projectAuthor}`
      );
      const { data } = response;
      setOtherProjects(data);
    };
    getProjects();
  }, [project]);

  return (
    <div>
      {showing && (
        <>
          <div className={classes.background} onClick={onClick}></div>
          <div className={classes.modal}>
            <div className={classes.card}>
              <div className={classes.header}>
                About the creator
                <Button onClick={onClick} className={classes.justifyEnd}>
                  <CloseSharp />
                </Button>
              </div>

              <div className={classes.body}>
                <div className={classes.level2}>
                  <Avatar src={creator?.avatar} alt={fullName} />
                  <Typography className={classes.name}>{fullName}</Typography>
                </div>
                <Typography className={classes.location}>{location}</Typography>
                <Typography className={classes.bio}>
                  {creator?.bio ||
                    `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has`}
                </Typography>

                <div style={{ display: "none" }}>
                  <div className={classes.socials}>
                    <Chip
                      label="Facebook"
                      variant="outlined"
                      icon={<Facebook className={classes.icon} />}
                      className={classes.pointer}
                      color={
                        connections?.includes("facebook")
                          ? "primary"
                          : undefined
                      }
                    />
                    <Chip
                      label="Google"
                      variant="outlined"
                      icon={<LinkedIn className={classes.icon} />}
                      className={classes.pointer}
                      color={
                        connections?.includes("google") ? "primary" : undefined
                      }
                    />
                    <Chip
                      label="Linked In"
                      variant="outlined"
                      icon={<LinkedIn className={classes.icon} />}
                      className={classes.pointer}
                      color={
                        connections?.includes("linked in")
                          ? "primary"
                          : undefined
                      }
                    />
                  </div>
                </div>
                <div className={`${classes.half} ${classes.chips}`}>
                  {creator?.skills?.map((s: string) => (
                    <Chip label={s} />
                  ))}
                </div>
              </div>

              <div className={classes.footer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.saveButton}
                >
                  Contact Creator
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.saveButton}
                >
                  Donate To Creator
                </Button>
              </div>
            </div>
            <div className={classes.projects}>
              {otherProjects.map((p: IProject) => {
                return <Card2 project={p} onClick={() => onClick("")} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
