import express from 'express';
import {
  loginController,
  logoutController,
  getUserController,
  upUserController,
} from '../controller/authController';
import {
  getCompetencias,
  deleteUserController,
} from '../controller/extraController';

const baseRoute = express.Router();
const cadRouter = express.Router();
baseRoute.post('/login', loginController);
baseRoute.post('/logout', authController, logoutController);
baseRoute.get('/usuario', authController, getUserController);
baseRoute.get('/competencias' authController, getCompetencias);
baseRoute.put('/usuario', authController,upUserController);
baseRoute.delete('/usuario',authController, deleteUserController);

export { baseRoute };
