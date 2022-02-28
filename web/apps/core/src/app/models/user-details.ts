import { UserPermission } from './application-facade';

export interface UserDetails {
  userId: string | null;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  permission: UserPermission | null;
}
