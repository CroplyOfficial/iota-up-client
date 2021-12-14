export interface IUser {
  __v?: number;
  _id?: string;
  avatar?: string;
  backedProjects?: string[];
  connections?: string[];
  email?: string;
  firstName?: string;
  isAdmin?: boolean;
  isBanned?: boolean;
  lastName?: string;
  skills?: string[];
  token?: string;
  upvotedProjects?: string[];
  wallet: string;
  country: string;
  city: string;
  bio?: string;
  username?: string;
  projects?: any;
}
