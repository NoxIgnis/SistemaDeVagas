import { Request, Response } from 'express';
import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userService } from '../services/user.service';
import md5 from 'blueimp-md5';
import { bodySchema, mensagemSchema } from '../schemas/auth';

interface IUserController {
    getUser(req: Request, res: Response): Promise<Response>;
    insertUser(req: Request, res: Response): Promise<Response>;
    updateUser(req: Request, res: Response): Promise<Response>;
    deleteUser(req: Request, res: Response): Promise<Response>;
}

class UserController implements IUserController {
    constructor(private userServ: userService = new userService()) { }

    async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];

            if (!token) return res.status(400).json({ error: 'Error select' });

            const user = await this.userServ.getUser(token);
            if (user?.tipo == 'empresa') {
                delete user?.competencias
                delete user?.experiencia
            } if (user?.tipo == 'candidato') {
                delete user?.vagas
                delete user?.ramo
                delete user?.descricao
                if (user?.competencias) {
                    user?.competencias = JSON.parse(user?.competencias ?? '');
                }
                if (user?.experiencia) {
                    user?.experiencia = JSON.parse(user?.experiencia ?? '');
                }
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err });
        }
    }

    async insertUser(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];
            if (!token) return res.status(400).json({ error: 'Error Insert' });
            const body = bodySchema.parse(req.body);

            const resp = await this.userServ.insertUser(body)
            if (!resp) return res.status(400).json({ error: 'Error Insert' });
            return res.status(200).json({ menssagem: 'Insert OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    async insertEmp(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];
            if (!token) return res.status(400).json({ error: 'Error Insert' });
            const body = bodySchema.parse(req.body);
            body.tipo = true;
            const resp = await this.userServ.insertUser(body)
            if (!resp) return res.status(400).json({ error: 'Error Insert' });
            return res.status(200).json({ menssagem: 'Insert OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];
            if (!token) return res.status(400).json({ error: 'Error update' });

            const body = bodySchema.parse(req.body);
            if (body.experiencia) {
                body.experiencia = JSON.stringify(body.experiencia)
            }
            if (body.competencias) {
                body.competencias = JSON.stringify(body.competencias)
            }
            const resp = await this.userServ.updateUser(token, body)
            if (!resp) return res.status(400).json({ error: 'Error update' });
            return res.status(200).json({ mensagem: 'update OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }
    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];
            if (!token) return res.status(400).json({ error: 'Error delete' });
            const resp = await this.userServ.deleteUser(token)
            console.log(resp)
            if (!resp) return res.status(400).json({ error: 'Error delete' });
            return res.status(200).json({ mensagem: 'delete OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    async inserirMensagem(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];
            if (!token) return res.status(400).json({ error: 'Error Insert' });
            const body = mensagemSchema.parse(req.body);
            const resp = await this.userServ.insertMensagem(token[1], body)
            if (!resp) return res.status(400).json({ error: 'Error Insert' });
            return res.status(200).json({ menssagem: 'Insert OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }
}

export { UserController };
