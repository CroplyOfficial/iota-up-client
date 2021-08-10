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
import { Card2 } from "../card/card2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "100vw",
      minHeight: "100vh",
      overflowX: "hidden",
      position: "absolute",
      zIndex: 2,
      top: 0,
      left: 0,
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
      position: "absolute",
      transform: "translate(50%,50%)",
      top: 0,
      left: 0,
      borderRadius: "15px",
      padding: "15px",
      paddingBottom: "20px",
      paddingTop: "20px",
      click: "unset",
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
      marginTop: "15px",
      display: "flex",
      gap: "15px",
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
      justifyContent: "space-around",
      gap: "15px",
    },
    projects: {
      marginTop: "5rem",
      width: "80%",
    },
    level: {
      width: "100%",
      height: "100px",
      display: "flex",
      alignItems: "flex-end",
    },
    half: {
      width: "50%",
    },
    pointer: {},
    icon: {},
  })
);

interface IProps {
  showing: boolean;
  onClick: (e: any) => void;
}
export const UserProjectsModal = ({ showing, onClick }: IProps) => {
  const userMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userMeta;
  const {
    firstName,
    lastName,
    city,
    country,
    skills,
    connections,
    avatar,
    projects,
    bio,
    _id,
  } = userInfo;
  const fullName = `${firstName} ${lastName}`;
  const location = `${city}, ${country}`;
  const classes = useStyles();
  const [otherProjects, setOtherProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get(`/api/projects/by-user/${_id}`);
      const { data } = response;
      setOtherProjects(data);
    };
    getProjects();
  }, []);

  return (
    <div>
      {showing && (
        <>
          <div className={classes.background} onClick={onClick}></div>
          <div className={classes.modal}>
            <div className={classes.card}>
              <div className={classes.header}>About the creator</div>
              <div className={classes.body}>
                <div className={classes.level2}>
                  <Avatar src={avatar} alt={fullName} />
                  <Typography className={classes.name}>{fullName}</Typography>
                </div>
                <Typography className={classes.location}>{location}</Typography>
                <Typography className={classes.bio}>
                  {bio ||
                    `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has`}
                </Typography>

                <div className={classes.socials}>
                  <Chip
                    label="Facebook"
                    variant="outlined"
                    icon={<Facebook className={classes.icon} />}
                    className={classes.pointer}
                    color={
                      connections?.includes("facebook") ? "primary" : undefined
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
                      connections?.includes("linked in") ? "primary" : undefined
                    }
                  />
                </div>
                <div className={`${classes.half} ${classes.chips}`}>
                  {skills.map((s: string) => (
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
                return <Card2 project={p} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
