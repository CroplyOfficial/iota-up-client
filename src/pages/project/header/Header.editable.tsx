import {
  Card,
  makeStyles,
  createStyles,
  Typography,
  Button,
  Theme,
  TextField,
} from "@material-ui/core";
import { FavoriteSharp, Money, CalendarToday } from "@material-ui/icons";
import { useState } from "react";
import { Container } from "../../../components/container/container";
import { IProject } from "../../../interfaces/project.interface";
import { HeaderTags } from "./tags.header";
import { EditableHeaderTags } from "./tags.editable";
import { HeaderCardHeader } from "./cardHeader.header";
import { ProjectPageVariants } from "../../../interfaces/project.variants.interface";
import { ContributorPill } from "./contributor.pill";
import { ContributorCheckBox } from "./contributor.checkbox";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { userLoginReducer } from "../../../reducers/userReducers";
import axios from "axios";
import { API } from "../../../config";

const KeyCodes = {
  comma: [188],
  enter: [10, 13],
  space: [47],
};

interface IProps {
  variant: ProjectPageVariants;
  project: IProject;
  showImageModal: () => void;
  onToggle: () => void;
}
export const EditableProjectHeader = (props: IProps) => {
  const { variant, project, showImageModal, onToggle } = props;
  const {
    created,
    projectAuthor,
    desc,
    name,
    media,
    backers,
    tags: initialTags,
    category,
    upvotes,
  } = project as IProject;
  const fallbackImage = "https://source.unsplash.com/random";
  const mainImage = media[0] || fallbackImage;
  /* Tags */
  const [tags, setTags] = useState<Array<string>>(initialTags || []);
  const [newTag, setNewTag] = useState<string>("");

  const handleNewSkill = (e: any) => {
    const skill = e.currentTarget.value;
    if (skill.toLowerCase() === newTag.toLowerCase()) return;
    setNewTag(skill);
  };
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!newTag.length) return;
    if (tags.includes(newTag.toLowerCase())) return;
    if (tags.length >= 6) return;
    setNewTag("");
    setTags([...tags, newTag]);
  };
  const removeChipAt = (i: number) => {
    const newTags = [...tags];
    newTags.splice(i - 1, 1);
    setTags([...newTags]);
  };
  /* Tags */

  /* Title */
  const [title, setTitle] = useState(name);
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  /* Title */

  /* Description */
  const [description, setDescription] = useState(desc);
  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.currentTarget.value);
  };
  /* Description */

  /* Looking For Contributors */
  const [lookingForContributors, setLookingForContributors] = useState<boolean>(
    project.lookingForContributors ?? false
  );

  const onToggleCheckbox = () => {
    setLookingForContributors(!lookingForContributors);
  };
  /* Looking For Contributors */

  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userLogin);
  //@ts-ignore
  const isProjectAuthor = userInfo?.userInfo?._id === project?.projectAuthor;
  const handleSaveProject = () => {
    const editables = [title, description, tags];
    {
      /*
    const options = {
      headers: {},
      body: {}
    }
    axios.put(`${API}/somewhere`, options);
      */
    }
    onToggle();
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        paddingTop: "15px",
        paddingBottom: "15px",
        marginTop: "50px",
        minheight: "750px",
        display: "flex",
        borderRadius: "20px",
      },
      left: {
        maxWidth: "48.5%",
        padding: "30px",
        paddingRight: "20px",
      },
      mainImageWrapper: {
        width: "756px",
        height: "425px",
        borderRadius: "20px",
        backgroundColor: "#f5f5f5",
        marginBottom: "20px",
        overflow: "hidden",
      },
      imagesWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > div": {
          background: "#f5f5f5",
          width: "170px",
          height: "96px",
          marginRight: "25px",
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
          marginBottom: "20px",
        },

        "& > div:nth-child(1)": {
          borderRadius: "20px",
          backgroundSize: "100%",
        },
        "& > div:nth-child(2)": {
          borderRadius: "20px",
        },
        "& > div:nth-child(3)": {
          borderRadius: "20px",
        },
        "& > div:nth-child(4)": {
          borderRadius: "20px",
          marginRight: "0",
        },
        "& > div:nth-child(5)": {
          display: "none",
        },
      },
      right: {
        flexGrow: 55,
        padding: "30px",
        paddingLeft: "25px",
      },
      title: {
        fontFamily: "Poppins",
        fontWeight: 700,
        fontStyle: "normal",
        fontSize: "32px",
        lineHeight: "48px",
        paddingBottom: "20px",
        border: "0px solid white",
        display: "block",
      },
      description: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
        border: "0px solid white",
        display: "block",
        width: "100%",
        minHeight: "150px",
        resize: "vertical",
      },
      buttons: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: "1rem",
      },
      button: {
        fontFamily: "Poppins",
        fontWeight: 700,
        fontStyle: "normal",
        fontSize: "18px",
        lineHeight: "27px",
        padding: "15px",
        paddingLeft: "45px",
        paddingRight: "45px",
        borderRadius: "10px",
        width: "282.18px",
      },
      statsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "10px",
      },
      stats: {
        display: "flex",
        flexDirection: "row",

        "& > div": {
          display: "flex",
          flexDirection: "column",
        },
      },
      statsHeader: {
        fontFamily: "Poppins",
        fontWeight: 800,
        fontStyle: "normal",
        fontSize: "24px",
        lineHeight: "36px",
        paddingBottom: "5px",
      },
      statsSubHeader: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
      },
      headerWrapper: {
        position: "relative",
      },
      statsIcon: {
        paddingRight: "1.5rem",
      },
      projectTagsHeader: {
        fontFamily: "Poppins",
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "24px",
        paddingBottom: "15px",
        paddingTop: "10px",
      },
      hr: {
        stroke: "3px solid green",
        border: "0.1px solid rgba(0,0,0,0.05)",
        marginBottom: "35px",
      },
      pills: {},
      tags: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        minWidth: "1000px",
        gap: "1rem",

        "& > *": {
          backgroundColor: "#E9E9E9",
          fontFamily: "Open Sans",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "16px",
          lineHeight: "28px",
        },
      },
      categories: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        maxWidth: "100%",
        gap: "1rem",

        "& > *": {
          backgroundColor: `${theme.palette.primary.main}4D`,
          fontFamily: "Open Sans",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "16px",
          lineHeight: "28px",
        },
        paddingBottom: "1rem",
      },

      objectFill: {
        objectFit: "fill",
        width: "100%",
        height: "100%",
      },
      editButton: {
        display: "flex",
        flexDirection: "row-reverse",
      },
    })
  );

  const classes = useStyles();
  return (
    <Container>
      <Card className={classes.root}>
        <div className={classes.left}>
          <div
            className={classes.mainImageWrapper}
            onClick={() => showImageModal()}
          >
            <img src={mainImage} className={classes.objectFill} />
          </div>
          <div className={classes.imagesWrapper}>
            {media.slice(1, media.length).map((image, i) => (
              <div className={"image-" + i++} onClick={showImageModal}>
                <img src={image} className={classes.objectFill} />
              </div>
            ))}
          </div>
          <Typography className={classes.projectTagsHeader}>
            Project Tags:
          </Typography>
          <div className={classes.pills}>
            <span>
              <HeaderTags
                tags={category}
                variant={variant}
                className={classes.categories}
              />
              <EditableHeaderTags
                tags={tags}
                variant={variant}
                className={classes.tags}
                onDelete={removeChipAt}
              />
              <form onSubmit={(e: any) => handleAddSkill(e)}>
                <TextField
                  label="Add a tag"
                  onChange={(e: any) => handleNewSkill(e)}
                  value={newTag}
                />
              </form>
            </span>
          </div>
        </div>
        <div className={classes.right}>
          <HeaderCardHeader project={project} />
          <ContributorCheckBox
            project={project}
            checked={lookingForContributors}
            onChange={onToggleCheckbox}
          />
          {/* <ContributorPill project={project} /> 
 <ContributorCheckBox
            project={project}
            checked={lookingForContributors}
            onChange={onToggleCheckbox}
          />

          */}
          <input
            className={classes.title}
            value={title}
            onChange={handleChangeTitle}
          />

          <textarea
            className={classes.description}
            value={description}
            onChange={handleChangeDescription}
          />
          {/*
          <Typography variant="h2" className={classes.title}>
            {name}
          </Typography>
          <Typography
            variant="body1"
            component="span"
            className={classes.description}
          >
            {desc}
          </Typography>
            */}
          <div className={classes.statsWrapper}>
            <div className={classes.stats}>
              <Money fontSize="large" className={classes.statsIcon} />
              <div>
                <div className={classes.headerWrapper}>
                  <Typography variant="h4" className={classes.statsHeader}>
                    {upvotes}
                  </Typography>
                </div>
                <Typography variant="h4" className={classes.statsSubHeader}>
                  UP Votes
                </Typography>
              </div>
            </div>
            <div className={classes.stats}>
              <CalendarToday fontSize="large" className={classes.statsIcon} />
              <div>
                <Typography variant="h4" className={classes.statsHeader}>
                  {backers}
                </Typography>
                <Typography variant="h4" className={classes.statsSubHeader}>
                  Donations
                </Typography>
              </div>
            </div>

            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                style={{ border: "none", color: "white" }}
              >
                Donate Now
                <FavoriteSharp />
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Contact Creator
              </Button>
            </div>
          </div>
          <hr className={classes.hr} />
          <div className={classes.editButton}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={handleSaveProject}
            >
              Save Project
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
};
