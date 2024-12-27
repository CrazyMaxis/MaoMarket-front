import { IShortUser } from './IUserInstance';

export interface IComment {
  id: string;
  body: string;
  createdAt: string;
  user: IShortUser;
}
