import express from 'express';

import {
    VagasController
} from '../controller/vagas.controller';

const vagasController = new VagasController()
const vagasRoute = express.Router();

vagasRoute.post('/vagas', vagasController.insertVaga.bind(vagasController));
vagasRoute.put('/vagas/:id_vaga', vagasController.updateVaga.bind(vagasController));
vagasRoute.delete('/vagas/:id_vaga', vagasController.deleteVaga.bind(vagasController));
vagasRoute.get('/vagas/:id_vaga', vagasController.getVaga.bind(vagasController));
vagasRoute.get('/vagas', vagasController.getVagas.bind(vagasController));

export { vagasRoute };
