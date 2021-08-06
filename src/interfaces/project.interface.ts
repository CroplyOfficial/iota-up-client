export interface IProject {
  name: string;
  desc: string;
  projectAuthor: any;
  tags: Array<string>;
  upvotes: number;
  backers: number;
  media: Array<string>;
  created: Date;
  video: string;
  _id?: any;
  id: any;
  category: string[];
  editorState: string;
  wallet: string;
  author?: {
    fullName?: string;
    avatar?: string;
    city?: string;
    country?: string;
    projects?: string[];
  };
}
