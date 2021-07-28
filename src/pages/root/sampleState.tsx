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

export const SampleProjects: IProject[] = [
  {
    title: "IOTA MEMES - fun community meme website",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

Eos cumque recusandae recusandae harum dolorem optio. Non asperiores ex qui mollitia et consectetur autem laborum ex. Enim ea deleniti sed omnis. Repudiandae nobis vitae in. Iusto ducimus sed non facilis occaecati quibusdam. Tenetur iure quo nihil minima aut qui. Harum voluptatem ullam deserunt voluptatem cumque rerum enim fugit nulla. Assumenda dolore ex inventore ut.

Consequatur et dignissimos a pariatur et accusantium aliquid. Dolor fugiat corrupti soluta praesentium expedita ducimus labore. Unde minima nulla fuga quos minus temporibus animi qui expedita. Sed quibusdam et. Rerum tempora sit qui ut fugiat.`,
    images: [
      "https://live.staticflickr.com/7629/28393379471_fd6ce887c3_b.jpg",
      "",
      "",
      "",
      "",
      "",
    ],
    tags: [],
    donations: 143,
    upvotes: 2132,
    created_at: 0,
    completed: false,
    funding: [0, 100],
    milestones: [],
    created_by: "abc",
  },
  {
    title: "Identity Suite - Open Source Application Blueprints",
    description: "Long project description",
    images: [
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1109&q=80",
      "",
      "",
      "",
      "",
      "",
    ],
    tags: ["technology"],
    donations: 143,
    upvotes: 2132,
    created_at: 0,
    completed: false,
    funding: [0, 100],
    milestones: [],
    created_by: "abc",
  },
  {
    title: "IOTA Live - Deep Dive Web Series with IF & Community Members",
    description: "Long project description",
    images: [
      "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
      "",
      "",
      "",
      "",
      "",
    ],
    tags: ["creative"],
    donations: 143,
    upvotes: 2132,
    created_at: 0,
    completed: false,
    funding: [0, 100],
    milestones: [],
    created_by: "abc",
  },
  {
    title: "IOTA MEMES - fun community meme website",
    description: "Long project description",
    images: [
      "https://live.staticflickr.com/7629/28393379471_fd6ce887c3_b.jpg",
      "",
      "",
      "",
      "",
      "",
    ],
    tags: [],
    donations: 143,
    upvotes: 2132,
    created_at: 0,
    completed: false,
    funding: [0, 100],
    milestones: [],
    created_by: "abc",
  },
];

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
