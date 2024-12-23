import { IShortUser } from './IUserInstance';

export interface IComment {
  id: string;
  body: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  user: IShortUser;
}
