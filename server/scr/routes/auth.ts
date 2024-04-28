import express from 'express';
import { loginController } from '../controller/authController';

const authRouter = express.Router();
authRouter.post('/login', loginController);

export { authRouter };
