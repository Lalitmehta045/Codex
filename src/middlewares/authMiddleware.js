import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: token missing'
    });
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: invalid token'
    });
  }

  const user = await User.findById(decoded.sub).select('-password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: user not found'
    });
  }

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  return next();
});
