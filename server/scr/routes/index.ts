import express from 'express';
import { authRouter } from './auth';
import { cadRouter } from './cadastro';

const routes = express.Router();
routes.use('/', authRouter);
routes.use('/usuarios', cadRouter);

export default routes;
