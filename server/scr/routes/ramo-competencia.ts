
import express from 'express';
import {
    competenciasController
} from '../controller/competencia.controller';

import {
    RamosController
} from '../controller/ramos.controller';

const compController = new competenciasController()
const ramosController = new RamosController()
const CompRoute = express.Router();
const ramoRoute = express.Router();

ramoRoute.get('/ramos', ramosController.getRamos.bind(ramosController));
CompRoute.get('/competencias', compController.getCompetencias.bind(compController));

export { ramoRoute, CompRoute };
