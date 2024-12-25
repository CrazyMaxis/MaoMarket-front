import { Roles } from 'enums/Roles';

export interface IUserInstance {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  telegramUsername: string;
  role: Roles;
  isBlocked: boolean;
  verificationRequested: boolean;
}

export interface IShortUser {
  id: string;
  name: string;
}
