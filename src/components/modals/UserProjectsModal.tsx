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
import { Facebook, LinkedIn } from "@material-ui/icons";
import { API } from "../../config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "100vw",
      minHeight: "100vh",
      overflowX: "hidden",
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      zIndex: 2,
      top: 0,
      left: 0,
    },
    wrapper: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      alignItems: "center",
      zIndex: 3,
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 2,
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
      marginTop: "10%",
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
    name: {},
    location: {},
    bio: {
      width: "100%",
      minHeight: "100px",
    },
    socials: {},
    social: {
      marginTop: "15px",
    },
    skills: {},
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
  } = userInfo;
  const fullName = `${firstName} ${lastName}`;
  const location = `${city}, ${country}`;
  console.log("userInfo", userInfo);
  const classes = useStyles();

  return (
    <div>
      {showing && (
        <div className={classes.modal} onClick={onClick}>
          <div className={classes.background} onClick={onClick}></div>
          <div className={classes.wrapper} onClick={onClick}>
            <div className={classes.card}>
              <div className={classes.header}>About the creator</div>
              <div className={classes.body}>
                <Typography className={classes.name}>{fullName}</Typography>
                <Typography className={classes.location}>{location}</Typography>
                <Typography className={classes.bio}>{bio}</Typography>

                <div className={classes.level}>
                  <div className={classes.half}>
                    <div className={classes.socials}>
                      <div className={classes.social}>
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
                      </div>
                      <div className={classes.social}>
                        <Chip
                          label="Google"
                          variant="outlined"
                          icon={<LinkedIn className={classes.icon} />}
                          className={classes.pointer}
                          color={
                            connections?.includes("google")
                              ? "primary"
                              : undefined
                          }
                        />
                      </div>
                      <div className={classes.social}>
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
                  </div>
                  <div className={`${classes.half} ${classes.chips}`}>
                    {skills.map((s: string) => (
                      <Chip label={s} />
                    ))}
                  </div>
                </div>
              </div>

              <div className={classes.footer}>
                <Button
                  variant="contained"
                  onClick={onClick}
                  color="primary"
                  className={classes.saveButton}
                >
                  Contact Creator
                </Button>
                <Button
                  variant="contained"
                  onClick={onClick}
                  color="secondary"
                  className={classes.saveButton}
                >
                  Donate To Creator
                </Button>
              </div>
            </div>
            <div className={classes.projects}>
              {projects.map((p: any) => {
                return (
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      color: "green",
                      backgroundColor: "white",
                    }}
                  >
                    {p}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
