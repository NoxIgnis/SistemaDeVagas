import express from 'express';

import {
    UserController
} from '../controller/user.controller';
const userController = new UserController()
const usuarioRoute = express.Router();

usuarioRoute.get('/usuario', userController.getUser.bind(userController));
usuarioRoute.put('/usuario', userController.updateUser.bind(userController));
usuarioRoute.delete('/usuario', userController.deleteUser.bind(userController));

export { usuarioRoute };
