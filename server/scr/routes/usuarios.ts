import express from 'express';
import {
    UserController
} from '../controller/user.controller';
import {
    BuscarController
} from '../controller/buscar.controller';

const buscarController = new BuscarController()
const userController = new UserController()
const userRoute = express.Router();

userRoute.post('/candidatos', userController.insertUser.bind(userController))
userRoute.post('/empresa', userController.insertEmp.bind(userController))

userRoute.get('/candidatos/buscar', buscarController.getUsuarios.bind(buscarController))
userRoute.post('/candidatos/buscar', buscarController.getUsuariosFiltrados.bind(buscarController))

export { userRoute };
