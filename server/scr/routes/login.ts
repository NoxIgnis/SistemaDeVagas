
import express from 'express';
import { LogoutController } from '../controller/loginLogout.controller';
import { LoginController } from '../controller/loginLogout.controller';
const logoutController = new LogoutController()
const loginController = new LoginController()

const loginRoute = express.Router();
const logoutRoute = express.Router();
loginRoute.post('/', loginController.login.bind(loginController));
logoutRoute.use('/', logoutController.logout.bind(logoutController));
export { loginRoute, logoutRoute };
