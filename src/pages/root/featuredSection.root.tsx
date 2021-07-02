import {createStyles, makeStyles, Typography} from "@material-ui/core";
import {useState} from "react";
import { Card } from "../../components/card/card";

const useStyles = makeStyles(() => createStyles({
  root: {
  },
  text: {
    textAlign: "center",
  },
  header: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontStyle: "standard",
    fontSize: "50px",
    lineHeight: "75px"
  },
  subHeader: {
    paddingTop: "25px",
    paddingBottom: "100px",
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontStyle: "standard",
    fontSize: "16px",
    lineHeight: "28px"
  },
  cards: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-around",
  }
}))

export const FeaturedSection = () => {
  const initialState: Array<any> = [{
    title: "IOTA MEMES - fun community meme website",
    description: "Long project description",
    images: ["https://live.staticflickr.com/7629/28393379471_fd6ce887c3_b.jpg"],
    tags: [],
    donations: 143,
    upvotes: 2132,
  },
    { 
    title: "Identity Suite - Open Source Application Blueprints",
    description: "Long project description",
    images: ["https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1109&q=80"],
    tags: ["technology"],
    donations: 143,
    upvotes: 2132,
  },
    {
    title: "IOTA Live - Deep Dive Web Series with IF & Community Members",
    description: "Long project description",
    images: ["https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"],
    tags: ["creative"],
    donations: 143,
    upvotes: 2132,
  },


  ]
  const [projects, setProjects] = useState<Array<any>>(initialState);

  const classes = useStyles();
  return (
    <div>
      <div className={classes.text}>
      <Typography variant="h2" className={classes.header}>
        Projects on the UP
      </Typography>
      <Typography variant="h4" className={classes.subHeader}>
        Some of the top voted and supported projects
        <br/>
        across all categories from the UP community
        <br/>
        creators, designers, and developers
      </Typography>
      </div>
      <div className={classes.cards}>
       {projects.map((p,i)=> <Card project={p} key={"featured-project-"+(i +1)} />)
      }
      </div>
    </div>
  );
}
