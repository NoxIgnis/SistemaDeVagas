import express from 'express';
import {
    BuscarController
} from '../controller/buscar.controller';

const buscarController = new BuscarController()
const searchRouter = express.Router();

searchRouter.get('/buscar', buscarController.getUsuarios.bind(buscarController))
searchRouter.post('/buscar', buscarController.getUsuariosFiltrados.bind(buscarController))

export { searchRouter };
