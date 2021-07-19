import {
  createStyles,
  makeStyles,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import { Facebook, LinkedIn } from "@material-ui/icons";
import { useState } from "react";
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
      transform: "translate(50px,-350px)",
    },
    header: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "50px",
      lineHeight: "75px",
      color: "white",
    },
    input: {},
    button: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    label: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      color: "white",
      paddingBottom: "30px",
    },
    avatar: {},
    tags: {},
    socials: {
      display: "flex",
      flexDirection: "column",
      height: "300px",
      width: "auto",
    },
    socialTitle: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontSize: "17px",
      lineHeight: "26px",
      color: "white",
    },
    social: {
      display: "flex",
      cursor: "pointer",
      color: "white",
    },
    icon: {},
    firefly: {},
    modal: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "red",
      position: "absolute",
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
  const { verifyDelete } = props;
  const classes = useStyles();
  const [profile, setProfile] = useState<any>({});
  const [fireflyAdress, setFireflyAdress] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagSuggestions, setTagSuggestions] = useState<Tag[]>([]);
  const [showingModal, setShowingModal] = useState<boolean>(false);
  /*
  const addTag = (tag: string) => setTags([...tags, tag]);
  const removeTag = (tag: string) => {
    const tagIndex = tags.findIndex(
      (t) => t.toLowerCase() === tag.toLowerCase()
    );
    if (tagIndex < 0) return;
    const newTags = [...tags];
    newTags.splice(tagIndex, 1);
    setTags([...newTags]);
  };

  const handleOnChange = (e: React.KeyboardEvent<HTMLInputElement>) => {};
   */
  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (i: number) => {
    setTags([...tags.filter((e, index) => index !== i)]);
  };
  const handleDrag = () => {};

  const handleVerifyDelete = () => {
    setShowingModal(!showingModal);
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFireflyAdress(e.currentTarget.value);
  };

  return (
    <div className={classes.root}>
      {showingModal ? <DashboardDeleteModal /> : ""}
      <Typography className={classes.header}>Profile Settings</Typography>
      <Typography className={classes.label}>
        {profile.fullName || "Peter Parker"}
      </Typography>
      <div className={classes.tags}>
        <ReactTags
          tags={tags}
          suggestions={tagSuggestions}
          delimiters={delimiters}
          handleAddition={handleAddition}
          handleDelete={handleDelete}
          handleDrag={handleDrag}
          inputFieldPosition={"top"}
        />
      </div>
      <div className={classes.socials}>
        <div className={classes.social}>
          <Facebook className={classes.icon} />
          <span className={classes.socialTitle}>Facebook</span>
        </div>
        <div className={classes.social}>
          <LinkedIn className={classes.icon} />
          <span className={classes.socialTitle}>Google</span>
        </div>
        <div className={classes.social}>
          <LinkedIn className={classes.icon} />
          <span className={classes.socialTitle}>Linked In</span>
        </div>
      </div>

      <input
        className={classes.firefly}
        value={fireflyAdress}
        onChange={handleOnChange}
        placeholder="Firefly Adress..."
      />
      <br />
      <Button
        className={classes.button}
        onClick={verifyDelete}
        color="secondary"
        variant="contained"
      >
        Delete Account
      </Button>
    </div>
  );
};
const DashboardDeleteModal = () => {
  const classes = useStyles();
  return <div className={classes.modal}></div>;
};
