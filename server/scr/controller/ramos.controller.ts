import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { RamosService } from '../services/ramos.service';

interface IRamosController {
    getRamos(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response>;
}

class RamosController implements IRamosController {
    constructor(
        private ramoService: RamosService = new RamosService()
    ) { }

    async getRamos(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const ramos = await this.ramoService.getRamos();
            return res.status(200).json(ramos);
        } catch (err) {
            console.log(err);

            return res.status(400).json({ error: err });
        }
    }
}
export { RamosController };
