import {
  Card,
  makeStyles,
  createStyles,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import { FavoriteSharp, Money, CalendarToday } from "@material-ui/icons";
import { useState } from "react";
import { Container } from "../../../components/container/container";
import { IProject } from "../../../interfaces/project.interface";
import { HeaderTags } from "./tags.header";
import { HeaderCardHeader } from "./cardHeader.header";
import { ProjectPageVariants } from "../../../interfaces/project.variants.interface";

interface IProps {
  variant: ProjectPageVariants;
  project: IProject | Record<never, never>;
  showImageModal: () => void;
}
export const ProjectHeader = (props: IProps) => {
  const { variant, project, showImageModal } = props;
  const {
    created,
    projectAuthor,
    desc,
    name,
    media,
    backers,
    tags: initialTags = [
      "JavaScript",
      "React.js",
      "CSS",
      "HTML",
      "Open Source",
      "IOTA",
      "Web Applications",
      "Web Applications",
      "Web Applications",
    ],
    upvotes = 365,
  } = project as IProject;
  const fallbackImage = "https://source.unsplash.com/random";
  const mainImage = media[0] || fallbackImage;
  const [tags, setTags] = useState<Array<string>>(initialTags || []);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        paddingTop: "50px",
        paddingBottom: "50px",
        marginTop: "50px",
        height: "750px",
        display: "flex",
        borderRadius: "20px",
      },
      left: {
        maxWidth: "48.5%",
        padding: "30px",
        paddingRight: "20px",
      },
      mainImageWrapper: {
        width: "100%",
        height: "75%",
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
          width: "170.13px",
          height: "142.96px",
          marginRight: "25px",
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
        },

        "& > div:nth-child(1)": {
          borderRadius: "20px",
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
      },
      description: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
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
        border: `3px solid ${theme.palette.primary.main}`,
      },
      statsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "75px",
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
        paddingBottom: "50px",
      },
      hr: {
        stroke: "3px solid green",
        border: "0.1px solid rgba(0,0,0,0.05)",
        marginBottom: "35px",
      },
      tags: {
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
          backgroundColor: "#E9E9E9",
          borderRadius: "7.5px",
          padding: "2px",
          paddingLeft: "12px",
          paddingRight: "12px",
        },
      },
      objectFill: {
        objectFit: "cover",
        width: "100%",
        height: "100%",
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
        </div>
        <div className={classes.right}>
          <HeaderCardHeader project={project} />
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
          <Typography className={classes.projectTagsHeader}>
            Project Tags:
          </Typography>
          <HeaderTags tags={tags} variant={variant} className={classes.tags} />
        </div>
      </Card>
    </Container>
  );
};
