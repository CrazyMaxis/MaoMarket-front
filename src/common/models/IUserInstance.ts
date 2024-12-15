import { Roles } from 'enums/Roles';

export interface IUserInstance {
  id: string;
  name: string;
  email: string;
  role: Roles;
  isBlocked: boolean;
  VerificationRequested: boolean;
}
