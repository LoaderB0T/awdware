export class JwtPayload {
  public userId: string;
  public nbf: number;
  public exp: number;
  public iss: string;
  public aud: string;
}
