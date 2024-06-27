import express from 'express';
import { baseRoute } from './base';
import { userRoute } from './usuarios'

const routes = express.Router();
routes.use('/', baseRoute);
routes.use('/usuarios', userRoute);

export default routes;
