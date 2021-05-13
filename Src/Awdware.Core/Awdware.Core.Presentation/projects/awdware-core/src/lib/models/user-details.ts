import { UserPermission } from './application-facade';

export interface UserDetails {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  permission: UserPermission;
}
