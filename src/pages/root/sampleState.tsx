import {
  Add,
  Book,
  FilterFrames,
  HelpTwoTone,
  Close,
  RecentActors,
} from "@material-ui/icons";
import { makeStyles, createStyles } from "@material-ui/core";
import { ICard } from "../../interfaces/categoriesCard.interface";
import { IProject } from "../../interfaces/project.interface";

export const SampleProjects: IProject[] = [];

const style = { fontSize: "90px" };
export const SampleCategorieCards: Array<ICard> = [
  {
    icon: <Add color="primary" style={style} />,
    title: "Add",
  },
  {
    icon: <Book color="primary" style={style} />,
    title: "Book",
  },
  {
    icon: <FilterFrames color="primary" style={style} />,
    title: "Filter",
  },
  {
    icon: <HelpTwoTone color="primary" style={style} />,
    title: "Help",
  },
  {
    icon: <Close color="primary" style={style} />,
    title: "Close",
  },
  /*
   {
    icon: <RecentActors color="primary" style={style} />,
    title: "Actors",
  },
   */
];
