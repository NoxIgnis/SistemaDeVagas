import express from 'express';
import { loginController, logoutController ,getUserController, upUserController} from '../controller/authController';
import { getCompetencias} from '../controller/extraController';

const authRouter = express.Router();
authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.get('/usuario', getUserController)
authRouter.get('/competencias', getCompetencias)
authRouter.put('/usuario', upUserController)

export { authRouter };
