import express from 'express';
import { authRouter } from './auth';

const routes = express.Router();

routes.use('/', authRouter);

export default routes;
