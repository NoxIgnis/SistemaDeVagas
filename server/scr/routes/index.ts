import express from 'express';
import { baseRoute } from './auth';
import { cadRouter } from './cadastro';

const routes = express.Router();
routes.use('/', baseRoute);
routes.use('/usuarios', cadRouter);

export default routes;
