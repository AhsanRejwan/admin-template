export interface TokenResponse {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  tokenType: string;
  scope: string;
}
