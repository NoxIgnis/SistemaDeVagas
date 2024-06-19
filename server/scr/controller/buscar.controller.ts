import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { BuscarService } from '../services/buscar.service';
import { buscarSchema } from '../schemas/auth';

interface IBuscarController {
    getUsuarios(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response>;
    getUsuariosFiltrados(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response>;
}

class BuscarController implements IBuscarController {
    constructor(
        private service: BuscarService = new BuscarService()
    ) { }

    async getUsuarios(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const candidatos = await this.service.getUsuarios();
            return res.status(200).json(candidatos);
        } catch (err) {
            console.log(err);

            return res.status(400).json({ error: err });
        }
    }

    async getUsuariosFiltrados(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const body = buscarSchema.parse(req.body);
            console.log(body)
            let candidatos = await this.service.getUsuarios();
            if (body.nome) {
                candidatos = candidatos.filter((f: any) => f.nome == body.nome)
            }
            if (body?.experiencia) {
                let exp: any = [];
                let candidatosExp: any = [];
                candidatos.forEach((cand: any, index: string) => {
                    exp.push(JSON.parse(cand.experiencia))
                    const dataInicio = new Date(String(exp[index][0].inicio));
                    const dataFim = new Date(String(exp[index][0].fim));
                    const periodo = dataFim.getTime() - dataInicio.getTime();
                    const anos = Math.floor(periodo / (1000 * 60 * 60 * 24 * 365));

                    if (anos <= (body?.experiencia ?? 0) && anos > 0) {
                        candidatosExp.push(cand)
                    }
                })
                candidatos = candidatosExp
            }
            if (body.competencias) {
                let comp: any = [];
                let candidatosComp: any = [];
                const map = body.competencias.map((comp) =>
                    comp.id
                )
                console.log('map', map)
                candidatos.forEach((cand: any, index: string) => {
                    comp.push(JSON.parse(cand.competencias))
                    map.forEach((id: any) => {
                        const compMap = comp[index].map((comp: any) =>
                            comp.id
                        )
                        if (compMap.includes(id)) {
                            candidatosComp.push(cand)
                        }
                    })
                })

                candidatos = candidatosComp
            }

            return res.status(200).json(candidatos);
        } catch (err) {
            console.log(err);

            return res.status(400).json({ error: err });
        }
    }
}
export { BuscarController };
