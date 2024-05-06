import express from 'express';
import { userController , empController} from '../controller/extraController';

const cadRouter = express.Router();
cadRouter.post('/candidato', userController)
cadRouter.post('/empresa', empController)

export { cadRouter };
