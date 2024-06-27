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
            candidatos.forEach((cand: any, index: string) => {
                delete cand?.vagas
                delete cand?.ramo
                delete cand?.descricao
                delete cand?.id

                cand.experiencia = JSON.parse(cand.experiencia);
                cand.competencias = JSON.parse(cand.competencias);

                candidatos[index] = cand;
            })

            return res.status(200).json({ candidatos: candidatos });
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
                candidatos = candidatos.filter((cand: any) => {
                    if (cand.nome == body.nome) {
                        delete cand?.vagas
                        delete cand?.ramo
                        delete cand?.descricao
                        delete cand?.id

                        cand.experiencia = JSON.parse(cand.experiencia);
                        cand.competencias = JSON.parse(cand.competencias);
                        return cand
                    }
                })
            }
            if (body?.experiencia) {
                let exp: any = [];
                let candidatosExp: any = [];
                candidatos.forEach((cand: any, index: string) => {
                    exp.push(JSON.parse(cand.experiencia))
                    cand.experiencia = JSON.parse(cand.experiencia);
                    cand.competencias = JSON.parse(cand.competencias);

                    const dataInicio = new Date(String(exp[index][0].inicio));
                    const dataFim = new Date(String(exp[index][0].fim));
                    const periodo = dataFim.getTime() - dataInicio.getTime();
                    const anos = Math.floor(periodo / (1000 * 60 * 60 * 24 * 365));

                    if (anos <= (body?.experiencia ?? 0) && anos > 0) {
                        delete cand?.vagas
                        delete cand?.ramo
                        delete cand?.descricao
                        delete cand?.id

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
                    cand.experiencia = JSON.parse(cand.experiencia);
                    cand.competencias = JSON.parse(cand.competencias);

                    map.forEach((id: any) => {
                        console.log('compMap', comp[index].map((comp: any) =>
                            comp.id
                        ))

                        const compMap = comp[index].map((comp: any) =>
                            comp.id
                        )
                        if (compMap.includes(id)) {
                            delete cand?.vagas
                            delete cand?.ramo
                            delete cand?.descricao
                            delete cand?.id

                            candidatosComp.push(cand)
                        }

                    })

                })

                candidatos = candidatosComp
            }

            if (!body.nome && !body.competencias && !body.experiencia) {
                candidatos.forEach((cand: any, index: string) => {
                    delete cand?.vagas
                    delete cand?.ramo
                    delete cand?.descricao
                    delete cand?.id

                    cand.experiencia = JSON.parse(cand.experiencia);
                    cand.competencias = JSON.parse(cand.competencias);

                    candidatos[index] = cand;
                })
            }
            console.log({ candidatos: candidatos })
            return res.status(200).json({ candidatos: candidatos });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: err });
        }
    }
}
export { BuscarController };
