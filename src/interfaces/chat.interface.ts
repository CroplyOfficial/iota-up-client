import { IMessage } from "./message.interface";

export interface IChat {
  members: [string, string];
  messages?: string[] | IMessage[];
  isBlocked: boolean;
  blockedBy: string;
  _id: string;
  __v: string;
}
