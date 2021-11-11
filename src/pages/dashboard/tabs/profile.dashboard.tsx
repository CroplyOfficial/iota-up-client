import { RootState } from "../../../store";
import { IUser } from "../../../interfaces/user.interface";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AUTH_ROOT } from "../../../config";
import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  Theme,
  TextField,
  Chip,
  TextareaAutosize,
} from "@material-ui/core";
import { Facebook, LinkedIn } from "@material-ui/icons";
import { getMyInfo } from "../../../actions/userActions";
import { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: [188],
  enter: [10, 13],
  space: [47],
};

const delimiters = [...KeyCodes.enter, ...KeyCodes.comma, ...KeyCodes.space];

interface Tag {
  id: string;
  text: string;
}
interface IProps {
  verifyDelete: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "25px",
      paddingTop: "15px",
      transform: "translate(50px,-175px)",
      backgroundColor: "white",
      [theme.breakpoints.down("sm")]: {
        transform: "translate(0px,-225px)",
      },
    },
    container: {
      width: "100%",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "50px",
      color: theme.palette.primary.main,
    },
    subHeader: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "16px",
      paddingBottom: "10px",
    },
    input: {},
    buttonDelete: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      paddingLeft: "20px",
      paddingRight: "20px",
      width: "250px",
    },
    buttonSave: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      paddingLeft: "20px",
      paddingRight: "20px",
      marginRight: "75px",
      width: "250px",
    },
    label: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      color: theme.palette.text.secondary,
      paddingTop: "10px",
    },
    avatar: {
      height: "100px",
      width: "100px",
      borderRadius: "50px",
      marginTop: "30px",
      marginBottom: "30px",
      cursor: "pointer",
    },
    tags: {},
    socials: {
      display: "flex",
      width: "auto",
      paddingBottom: "15px",
    },
    socialTitle: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontSize: "17px",
      lineHeight: "26px",
      color: "black",
    },
    social: {
      display: "flex",
      color: "black",
      margin: "5px",
      marginLeft: "0px",
    },
    icon: {},
    firefly: {},
    modal: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "red",
      position: "absolute",
    },
    textField: {
      marginRight: "15px",
      marginBottom: "15px",
      [theme.breakpoints.down("sm")]: {
        marginRight: "0px",
        marginBottom: "0px",
        width: "100%",
      },
    },
    skills: {},
    chip: {
      margin: "10px",
    },
    pointer: {
      cursor: "pointer",
    },
    textarea: {
      width: "60%",
      height: "100px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      resize: "none",
      marginBottom: "10px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginRight: "0px",
      },
    },
    uploadContainer: {
      width: "250px",
      height: "20px",
      background: "gray",
      borderRadius: "3px",
    },
    uploadBar: {
      height: "20px",
      borderRadius: "3px",
      background: "#1b8271",
    },
    buttons: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: "15px",
        "& > button": {
          width: "100%",
        },
      },
    },
  })
);

interface IProfile {
  fullName: string;
  firstName: string;
  lastName: string;
  id: string;
  created_at: number | Date;
  avatarURL: string;
}
export const DashboardProfile = (props: IProps) => {
  const userMeta = useSelector((state: RootState) => state.userLogin);
  const userInfoMeta = useSelector((state: RootState) => state.myInfo);
  const { myInfo }: any = userInfoMeta;
  const { userInfo }: any = userMeta;
  const user = (userInfo as IUser) || {};

  const {
    skills: userSkills,
    wallet: userWallet,
    city: userCity,
    country: userCountry,
    connections,
    avatar,
    bio: userBio,
  } = user;
  //
  const { verifyDelete } = props;
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);

  useEffect(() => {
    setUsername(myInfo?.username);
  }, [myInfo?.username]);

  const [city, setCity] = useState<string>(userCity ?? "");
  const [country, setCountry] = useState<string>(userCountry ?? "");
  const [fireflyAdress, setFireflyAdress] = useState<string>(userWallet ?? "");
  const [skills, setSkills] = useState<string[]>(userSkills || []);
  const [newSkill, setNewSkill] = useState<string>("");
  const [username, setUsername] = useState<string>(myInfo?.username || "");
  const [showingModal, setShowingModal] = useState<boolean>(false);
  const [bio, setBio] = useState<string>(userBio ?? "");
  const [userAvatar, setUserAvatar] = useState<string>(avatar ? avatar : "");
  const [tags, setTags]: any = useState<string[]>([]);
  const [file, setFile] = useState<any>({ file: { size: 0 } });
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFireflyAdress(e.currentTarget.value);
  };

  const handleOnSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const userUpdated = await axios.put(
      "/api/users/me",
      {
        wallet: fireflyAdress,
        city,
        country,
        skills,
        bio,
        user,
        username,
      },
      config
    );

    console.log(userUpdated);
  };

  const handleNewSkill = (e: any) => {
    const skill = e.currentTarget.value;
    if (skill.toLowerCase() === newSkill.toLowerCase()) return;
    setNewSkill(skill);
  };
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!newSkill.length) return;
    if (skills.includes(newSkill.toLowerCase())) return;
    if (skills.length >= 20) return;
    setNewSkill("");
    setSkills([...skills, newSkill]);
  };
  const removeChipAt = (i: number) => {
    const newSkills = [...skills];
    newSkills.splice(i - 1, 1);
    setSkills([...newSkills]);
  };

  const handleChangeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.currentTarget.value);
  };

  const handleAvatarChange = async () => {
    if (file) {
      const formData: any = new FormData();
      formData.append("media", file.file);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      try {
        const { data } = await axios.post("/api/uploads", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
          onUploadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        });
        const userUpdated = await axios.put(
          "/api/users/me",
          {
            avatar: data.url,
          },
          config
        );
        setUserAvatar(userUpdated.data.avatar);
        setUploading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    handleAvatarChange();
  }, [file]);
  return (
    <div className={classes.root}>
      {showingModal ? <DashboardDeleteModal /> : ""}

      <div className={classes.container}>
        <Typography className={classes.header}>Profile Settings</Typography>
        <Typography className={classes.label} style={{ display: "none" }}>
          Verified with
        </Typography>
        <div style={{ display: "none" }}>
          <div className={classes.socials}>
            <div
              className={classes.social}
              onClick={() =>
                (window.location.href = `${AUTH_ROOT}/users/authfacebook`)
              }
            >
              <Chip
                label="Facebook"
                variant="outlined"
                icon={<Facebook className={classes.icon} />}
                className={classes.pointer}
                color={
                  connections?.includes("facebook") ? "primary" : undefined
                }
              />
            </div>
            <div
              className={classes.social}
              onClick={() =>
                (window.location.href = `${AUTH_ROOT}/users/authgoogle`)
              }
            >
              <Chip
                label="Google"
                variant="outlined"
                icon={<LinkedIn className={classes.icon} />}
                className={classes.pointer}
                color={connections?.includes("google") ? "primary" : undefined}
              />
            </div>
            <div
              className={classes.social}
              onClick={() =>
                (window.location.href = `${AUTH_ROOT}/users/authlinkedin`)
              }
            >
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
          </div>
        </div>

        <form>
          <input
            type="file"
            name="image"
            id="imgPicker"
            accept=".png,.jpg,.jpeg"
            onChange={(e: any) => {
              setFile({
                file: e.target.files[0],
              });
              setUploading(true);
            }}
            style={{ display: "none" }}
          />
        </form>
        <img
          src={userAvatar}
          onClick={() => {
            // @ts-ignore
            document.getElementById("imgPicker")?.click();
          }}
          className={classes.avatar}
        />

        {uploading && (
          <div className={classes.uploadContainer}>
            <div
              className={classes.uploadBar}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <br />

        <TextField
          type="text"
          onChange={(e: any) => setUsername(e.target.value)}
          value={username}
          label="Display Name"
          className={classes.textField}
        />
        <br />
        <Typography className={classes.label}>About</Typography>
        <TextareaAutosize
          aria-label="Bio"
          placeholder="Your bio here..."
          rows="6"
          className={classes.textarea}
          onChange={(e: any) => handleChangeBio(e)}
          defaultValue={myInfo?.bio}
        />

        <Typography className={classes.label}>Location </Typography>
        <TextField
          type="text"
          onChange={(e: any) => setCity(e.target.value)}
          value={city || null}
          label="City"
          className={classes.textField}
        />
        <TextField
          type="text"
          onChange={(e: any) => setCountry(e.target.value)}
          value={country || null}
          label="Country"
          className={classes.textField}
        />
        <br />

        <br />
        <Typography className={classes.label}>Skills</Typography>
        <form onSubmit={(e: any) => handleAddSkill(e)}>
          <TextField
            label="Add a skill"
            onChange={(e: any) => handleNewSkill(e)}
            value={newSkill}
          />
        </form>
        <div className={classes.skills}>
          {skills.map((skill, i) => (
            <Chip
              label={skill}
              onDelete={() => removeChipAt(i)}
              color="primary"
              className={classes.chip}
              key={"chip-" + i++}
            />
          ))}
        </div>
        <TextField
          value={fireflyAdress}
          onChange={(e: any) => handleOnChange(e)}
          label={"IOTA Wallet Adress"}
          className={classes.textField}
          style={{ paddingBottom: "35px" }}
        />

        <br />

        <div className={classes.buttons}>
          <Button
            onClick={(e: any) => handleOnSave(e)}
            className={classes.buttonSave}
            color="primary"
            variant="outlined"
          >
            Save
          </Button>
          <Button
            className={classes.buttonDelete}
            onClick={verifyDelete}
            color="secondary"
            variant="contained"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};
const DashboardDeleteModal = () => {
  const classes = useStyles();
  return <div className={classes.modal}></div>;
};
