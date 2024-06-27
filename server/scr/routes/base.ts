import express from 'express';

import {
    authenticationController
} from '../controller/authentication.controller';

import {
    LoginController, LogoutController
} from '../controller/loginLogout.controller';

import {
    UserController
} from '../controller/user.controller';

import {
    competenciasController
} from '../controller/competencia.controller';

import {
    RamosController
} from '../controller/ramos.controller';

import {
    VagasController
} from '../controller/vagas.controller';

// import {
//     BuscarController
// } from '../controller/buscar.controller';

// const buscarController = new BuscarController()
const authController = new authenticationController()
const loginController = new LoginController()
const logoutController = new LogoutController()
const userController = new UserController()
const compController = new competenciasController()
const ramosController = new RamosController()
const vagasController = new VagasController()

const baseRoute = express.Router();

baseRoute.post('/login', loginController.login.bind(loginController));
baseRoute.post('/logout', authController.validate.bind(authController), logoutController.logout.bind(logoutController));

baseRoute.get('/usuario', authController.validate.bind(authController), userController.getUser.bind(userController));
baseRoute.put('/usuario', authController.validate.bind(authController), userController.updateUser.bind(userController));
baseRoute.delete('/usuario', authController.validate.bind(authController), userController.deleteUser.bind(userController));

baseRoute.get('/ramos', authController.validate.bind(authController), ramosController.getRamos.bind(ramosController));
baseRoute.get('/competencias', authController.validate.bind(authController), compController.getCompetencias.bind(compController));

baseRoute.post('/vagas', authController.validate.bind(authController), vagasController.insertVaga.bind(vagasController));
baseRoute.put('/vagas/:id_vaga', authController.validate.bind(authController), vagasController.updateVaga.bind(vagasController));
baseRoute.delete('/vagas/:id_vaga', authController.validate.bind(authController), vagasController.deleteVaga.bind(vagasController));
baseRoute.get('/vagas/:id_vaga', authController.validate.bind(authController), vagasController.getVaga.bind(vagasController));
baseRoute.get('/vagas', authController.validate.bind(authController), vagasController.getVagas.bind(vagasController));

baseRoute.post('/mensagem', authController.validate.bind(authController), userController.inserirMensagem.bind(userController))
baseRoute.get('/mensagem', authController.validate.bind(authController), userController.getMensagem.bind(userController))

// baseRoute.get('/buscar', buscarController.getUsuarios.bind(buscarController))
// baseRoute.post('/buscar', buscarController.getUsuariosFiltrados.bind(buscarController))

export { baseRoute };
