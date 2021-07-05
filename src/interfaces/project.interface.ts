import { IMilestone } from "./milestone.interface";
export interface IProject {
  created_at: number;
  title: string;
  description: string;
  tags: Array<string>;
  milestones: Array<Record<string, IMilestone>>;
  created_by: any;
  funding: [number, number]; // [current, goal]
  completed: boolean;
  images: [string, string, string, string, string, string];
  upvotes: number;
  donations: number;
}
