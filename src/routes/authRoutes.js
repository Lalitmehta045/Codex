import { Router } from 'express';
import { getProfile, login, register } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginValidator, registerValidator } from '../validators/authValidators.js';

const authRouter = Router();

authRouter.post('/register', registerValidator, validateRequest, register);
authRouter.post('/login', loginValidator, validateRequest, login);
authRouter.get('/me', protect, getProfile);

export default authRouter;
