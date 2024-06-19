import express from 'express';
import {
    UserController
} from '../controller/user.controller';

const userController = new UserController()
const cadRouter = express.Router();

cadRouter.post('/candidatos', userController.insertUser.bind(userController))
cadRouter.post('/empresa', userController.insertEmp.bind(userController))

export { cadRouter };
