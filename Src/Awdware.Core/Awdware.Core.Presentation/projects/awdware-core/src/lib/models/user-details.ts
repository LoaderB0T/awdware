import { UserPermission } from './application-facade';

export class UserDetails {
  public userId: string;
  public username: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public permission: UserPermission;
}
