import express from 'express';
import {
    UserController
} from '../controller/user.controller';
import {
    BuscarController
} from '../controller/buscar.controller';

const buscarController = new BuscarController()
const userController = new UserController()
const cadRouter = express.Router();

cadRouter.post('/candidatos', userController.insertUser.bind(userController))
cadRouter.post('/empresa', userController.insertEmp.bind(userController))
cadRouter.post('/candidatos/mensagem', userController.inserirMensagem.bind(userController))

cadRouter.get('/candidatos/buscar', buscarController.getUsuarios.bind(buscarController))
cadRouter.post('/candidatos/buscar', buscarController.getUsuariosFiltrados.bind(buscarController))

export { cadRouter };
