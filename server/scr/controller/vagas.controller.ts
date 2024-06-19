import { Request, Response } from 'express';
import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { vagasService } from '../services/vagas.service';
import md5 from 'blueimp-md5';
import { bodySchema, vagaSchema } from '../schemas/auth';

interface IVagasController {
    getVaga(req: Request, res: Response): Promise<Response>;
    getVagas(req: Request, res: Response): Promise<Response>;
    insertVaga(req: Request, res: Response): Promise<Response>;
    updateVaga(req: Request, res: Response): Promise<Response>;
    deleteVaga(req: Request, res: Response): Promise<Response>;
}

class VagasController implements IVagasController {
    constructor(private service: vagasService = new vagasService()) { }

    async getVaga(req: Request, res: Response): Promise<Response> {
        try {
            const id: string = req.params['id_vaga'];
            if (!id) return res.status(400).json({ error: 'Error select' });

            const vaga = await this.service.getVaga(id);
            if (vaga?.competencias) {
                vaga?.competencias = JSON.parse(vaga?.competencias as unknown as string)
            }
            // if (user?.tipo == 'empresa') {
            //     delete user?.competencias
            //     delete user?.experiencia
            // } if (user?.tipo == 'candidato') {
            //     delete user?.vagas
            //     delete user?.ramo
            //     delete user?.descricao
            //     if (user?.competencias) {
            //         user?.competencias = JSON.parse(user?.competencias ?? '');
            //     }
            //     if (user?.experiencia) {
            //         user?.experiencia = JSON.parse(user?.experiencia ?? '');
            //     }
            // }
            return res.status(200).json(vaga);
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    async getVagas(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];

            if (!token) return res.status(400).json({ error: 'Error select' });

            const vagas = await this.service.getVagas(token);
            if (Array.isArray(vagas)) {
                vagas.forEach((vaga, index) => {
                    vagas[index]?.competencias = JSON.parse(vaga.competencias as unknown as string)
                });
            }
            return res.status(200).json(vagas);
        } catch (err) {
            console.log(err);

            return res.status(400).json({ error: err });
        }
    }

    async insertVaga(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];
            if (!token) return res.status(400).json({ error: 'Error Insert' });
            const body = vagaSchema.parse(req.body);
            if (body.competencias) {
                body.competencias = JSON.stringify(body.competencias)
            }
            const resp = await this.service.insertVaga(token, body)
            if (!resp) return res.status(400).json({ error: 'Error Insert' });
            return res.status(200).json({ menssagem: 'Insert OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    async updateVaga(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];
            if (!token) return res.status(400).json({ error: 'Error update' });

            const body = vagaSchema.parse(req.body);
            if (body.competencias) {
                body.competencias = JSON.stringify(body.competencias)
            }
            const resp = await this.service.updateVaga(token, body)
            if (!resp) return res.status(400).json({ error: 'Error update' });
            return res.status(200).json({ mensagem: 'update OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }
    async deleteVaga(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];
            if (!token) return res.status(400).json({ error: 'Error delete' });
            const resp = await this.service.deleteVaga(token)
            console.log(resp)
            if (!resp) return res.status(400).json({ error: 'Error delete' });
            return res.status(200).json({ mensagem: 'delete OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }
}

export { VagasController };
