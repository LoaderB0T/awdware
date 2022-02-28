export interface JwtPayload {
  userId: string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}
