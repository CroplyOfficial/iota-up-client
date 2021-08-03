import {
  Add,
  Book,
  FilterFrames,
  HelpTwoTone,
  Close,
  RecentActors,
} from "@material-ui/icons";
import { makeStyles, createStyles, SvgIcon } from "@material-ui/core";
import { ICard } from "../../interfaces/categoriesCard.interface";
import { IProject } from "../../interfaces/project.interface";
import { ReactComponent as Art } from "../../static/images/icons/Art.svg";
import { ReactComponent as Film } from "../../static/images/icons/Film.svg";
import { ReactComponent as Environment } from "../../static/images/icons/Environment.svg";
import { ReactComponent as Chat } from "../../static/images/icons/chat.svg";
import { ReactComponent as User } from "../../static/images/icons/user.svg";
import { ReactComponent as View } from "../../static/images/icons/view.svg";
import { ReactComponent as Games } from "../../static/images/icons/Games.svg";
import { ReactComponent as Flag } from "../../static/images/icons/flag.svg";
import { ReactComponent as Flags } from "../../static/images/icons/flags.svg";
import { ReactComponent as Heart } from "../../static/images/icons/heart.svg";
import { ReactComponent as Share } from "../../static/images/icons/share.svg";
import { ReactComponent as Design } from "../../static/images/icons/Design.svg";
import { ReactComponent as Create } from "../../static/images/icons/create.svg";
import { ReactComponent as Events } from "../../static/images/icons/events.svg";
import { ReactComponent as Wallet } from "../../static/images/icons/wallet.svg";
import { ReactComponent as Culture } from "../../static/images/icons/Culture.svg";
import { ReactComponent as Explore } from "../../static/images/icons/explore.svg";
import { ReactComponent as Trusted } from "../../static/images/icons/trusted.svg";
import { ReactComponent as Writing } from "../../static/images/icons/writing.svg";
import { ReactComponent as Business } from "../../static/images/icons/Business.svg";
import { ReactComponent as Creative } from "../../static/images/icons/Creative.svg";
import { ReactComponent as Hardware } from "../../static/images/icons/Hardware.svg";
import { ReactComponent as HumanRights } from "../../static/images/icons/Human Rights.svg";
import { ReactComponent as Performance } from "../../static/images/icons/Performance.svg";
import { ReactComponent as Applications } from "../../static/images/icons/Applications.svg";
import { ReactComponent as Community } from "../../static/images/icons/community.svg";
import { ReactComponent as Technology } from "../../static/images/icons/technology.svg";
import { ReactComponent as Software } from "../../static/images/icons/Software.svg";
import { ReactComponent as Wellness } from "../../static/images/icons/Wellness.svg";
import { ReactComponent as Research } from "../../static/images/icons/research.svg";
import { ReactComponent as Website } from "../../static/images/icons/websites.svg";
import { ReactComponent as Education } from "../../static/images/icons/Education.svg";
import { ReactComponent as GreenTech } from "../../static/images/icons/Green Tech.svg";
import { ReactComponent as LikeDonate } from "../../static/images/icons/likedonate.svg";
import { ReactComponent as Journalism } from "../../static/images/icons/Journalism.svg";

const MySvgIcon = (props: any) => {
  return (
    <SvgIcon color="primary" style={{ fontSize: "75px" }}>
      {props.icon || ""}
    </SvgIcon>
  );
};

export const SampleProjects: IProject[] = [
  {
    title: "IOTA MEMES - fun community meme website",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip`,
    images: [
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
    ],
    tags: ["Creative", "IOTA", "Community"],
    donations: 143,
    upvotes: 2132,
    created_at: 0,
    completed: false,
    funding: [0, 100],
    milestones: [],
    created_by: "abc",
    _id: "1233333333331212d",
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
    _id: "1237123899093e",
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
    _id: "92133292139b",
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
    tags: ["community"],
    donations: 143,
    upvotes: 2132,
    created_at: 0,
    completed: false,
    funding: [0, 100],
    milestones: [],
    created_by: "abc",
    _id: "23z2137123a",
  },
];

const style = { fontSize: "90px" };
export const SampleCategorieCards: Array<ICard> = [
  {
    icon: <MySvgIcon icon={<Business />}></MySvgIcon>,
    title: "Business",
  },
  {
    icon: <MySvgIcon icon={<Culture />}></MySvgIcon>,
    title: "Culture",
  },
  {
    icon: <MySvgIcon icon={<Education />}></MySvgIcon>,
    title: "Education",
  },
  {
    icon: <MySvgIcon icon={<Environment />}></MySvgIcon>,
    title: "Environment",
  },
  {
    icon: <MySvgIcon icon={<Events />}></MySvgIcon>,
    title: "Events",
  },
  {
    icon: <MySvgIcon icon={<HumanRights />}></MySvgIcon>,
    title: "Human Rights",
  },
  {
    icon: <MySvgIcon icon={<Wellness />}></MySvgIcon>,
    title: "Wellness",
  },
  {
    icon: <MySvgIcon icon={<Art />}></MySvgIcon>,
    title: "Art",
  },
  {
    icon: <MySvgIcon icon={<Design />}></MySvgIcon>,
    title: "Design",
  },
  {
    icon: <MySvgIcon icon={<Film />}></MySvgIcon>,
    title: "Film",
  },
  {
    icon: <MySvgIcon icon={<Games />}></MySvgIcon>,
    title: "Games",
  },
  {
    icon: <MySvgIcon icon={<Journalism />}></MySvgIcon>,
    title: "Journalism",
  },
  {
    icon: <MySvgIcon icon={<Performance />}></MySvgIcon>,
    title: "Performance",
  },
  {
    icon: <MySvgIcon icon={<Writing />}></MySvgIcon>,
    title: "Writing",
  },
  {
    icon: <MySvgIcon icon={<Applications />}></MySvgIcon>,
    title: "Applications",
  },
  {
    icon: <MySvgIcon icon={<GreenTech />}></MySvgIcon>,
    title: "Green Tech",
  },
  {
    icon: <MySvgIcon icon={<Hardware />}></MySvgIcon>,
    title: "Hardware",
  },
  {
    icon: <MySvgIcon icon={<Research />}></MySvgIcon>,
    title: "Research",
  },
  {
    icon: <MySvgIcon icon={<Software />}></MySvgIcon>,
    title: "Software",
  },
  {
    icon: <MySvgIcon icon={<Community />}></MySvgIcon>,
    title: "Community",
  },
  {
    icon: <MySvgIcon icon={<Creative />}></MySvgIcon>,
    title: "Creative",
  },
  {
    icon: <MySvgIcon icon={<Technology />}></MySvgIcon>,
    title: "Technology",
  },
  /*
   {
    icon: <RecentActors color="primary" style={style} />,
    title: "Actors",
  },
   */
];
