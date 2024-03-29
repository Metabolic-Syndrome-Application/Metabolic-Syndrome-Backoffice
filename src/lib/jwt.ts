import jwt, { JwtPayload } from 'jsonwebtoken';

export const isRefreshTokenExpired = (refresh_token: string): boolean => {
  try {
    // Decode the refresh token jwt
    const decoded = jwt.decode(refresh_token) as JwtPayload;

    // Assuming the decoded token has an 'exp' field representing the expiration time
    if (decoded && typeof decoded.exp === 'number') {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp < currentTime; // Check if expiration time is in the past
    }
    return true; // If there's no 'exp' field or it's not a number, consider it expired
  } catch (error) {
    console.error('Error decoding refresh token:', error);
    return true; // Consider it expired if decoding fails
  }
};
