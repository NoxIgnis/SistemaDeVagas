import { Request, Response } from 'express';
import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userService } from '../services/user.service';
import md5 from 'blueimp-md5';
import { updateSchema } from '../schemas/auth';

interface IUserController {
    getUser(req: Request, res: Response): Promise<Response>;
}

class UserController implements IUserController {
    constructor(private userServ: userService = new userService()) { }

    async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];

            if (!token) return res.status(400).json({ error: 'Error select' });

            await this.userServ.getUser(token)
            return res.json({ menssagem: 'Logout OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const token: string[] = req.headers['authorization']?.split(' ') ?? [];
            if (!token) return res.status(400).json({ error: 'Error update' });
            const body = updateSchema.parse(req.body);

            const resp = await this.userServ.updateUser(token, body)
            if (!resp) return res.status(400).json({ error: 'Error update' });
            return res.json({ menssagem: 'update OK' });
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
            return res.json({ menssagem: 'delete OK' });
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }
}

export { UserController };
