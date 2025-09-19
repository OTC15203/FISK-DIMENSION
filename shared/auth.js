import jwt from 'jsonwebtoken';

const DEFAULT_ALGO = 'HS256';

export const verifyAccessToken = (token, secret, options = {}) => {
  if (!token) {
    throw new Error('Missing access token');
  }
  if (!secret) {
    throw new Error('Missing JWT secret');
  }

  const mergedOptions = { algorithms: [DEFAULT_ALGO], ...options };
  return jwt.verify(token, secret, mergedOptions);
};
