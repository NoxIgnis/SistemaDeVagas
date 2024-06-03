import express from 'express';
import { loginController, logoutController ,getUserController, upUserController} from '../controller/authController';
import { getCompetencias, userController, deleteUserController} from '../controller/extraController';

const authRouter = express.Router();
const cadRouter = express.Router();
authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
// cadRouter.post('/usuario/candidato', userController)
authRouter.get('/usuario', getUserController);
authRouter.get('/competencias', getCompetencias);
authRouter.put('/usuario', upUserController);
authRouter.delete('/usuario', deleteUserController);

export { authRouter };
