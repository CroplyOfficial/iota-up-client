import { EditorState } from "draft-js";
export interface IProject {
  created: number;
  name: string;
  desc: string;
  category: Array<string>;
  tags: Array<string>;
  projectAuthor: any;
  media: [string, string, string, string, string];
  video: string;
  upvotes: number;
  backers: number;
  information?: EditorState;
  _id?: string;
}
