import express from 'express';
// import {
//   // loginController,
//   // logoutController,
//   // getUserController,
//   // upUserController,
// } from '../controller/authController';
import {
  getCompetencias,
  // deleteUserController,
  // userController,
} from '../controller/extraController';

import {
  authenticationController
} from '../controller/authentication.controller';

import {
  LoginController, LogoutController
} from '../controller/loginLogout.controller';

import {
  UserController
} from '../controller/user.controller';

const authController = new authenticationController()
const loginController = new LoginController()
const logoutController = new LogoutController()
const userController = new UserController()

const baseRoute = express.Router();
// const cadRouter = express.Router();
baseRoute.post('/login', loginController.login.bind(loginController));
baseRoute.post('/logout', authController.validate.bind(authController), logoutController.logout.bind(logoutController));
baseRoute.get('/usuario', authController.validate.bind(authController), userController.getUser.bind(userController));
baseRoute.put('/usuario', authController.validate.bind(authController), userController.updateUser.bind(userController));
baseRoute.delete('/usuario', authController.validate.bind(authController), userController.deleteUser.bind(userController));
baseRoute.get('/competencias', authController.validate.bind(authController), getCompetencias);

export { baseRoute };
