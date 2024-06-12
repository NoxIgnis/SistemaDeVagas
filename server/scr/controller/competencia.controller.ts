import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { competenciaService } from '../services/competencias.service';

interface IcompetenciasController {
    getCompetencias(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response>;
}

class competenciasController implements IcompetenciasController {
    constructor(
        private compService: competenciaService = new competenciaService()
    ) { }

    async getCompetencias(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            await this.compService.getCompetencias()
            return res.status(401).json({ menssagem: 'Token Error' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }
}
export { competenciasController };
