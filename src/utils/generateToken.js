import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign({ sub: userId }, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });
};
