import { Request, Response } from 'express';
import config from '../configs/config';
import jwt from 'jsonwebtoken';
import { loginService, logoutService } from '../services/loginLogout.services';
import { loginSchema } from '../schemas/auth';
import md5 from 'blueimp-md5';

interface ILoginController {
  login(req: Request, res: Response): Promise<Response>;
}
interface ILogoutController {
  logout(req: Request, res: Response): Promise<Response>;
}
class LoginController implements ILoginController {
  constructor(private loginServ: loginService = new loginService()) { }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { content } = req.body;
      if (!content) return res.status(400).json({ error: 'Content is required' });

      const body = loginSchema.parse(content);

      const select = await this.loginServ.login(body);
      if (!select) return res.status(400).json({ error: 'Error select' });
      const payload = {
        email: select.email,
        versao: md5(`${select.id}-${select.email}-${select.tipo}`),
        tipo: select.tipo,
        id: select.id
      };

      return res.json({
        token: jwt.sign(payload, config.jwt.secret),
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}

class LogoutController implements ILogoutController {
  constructor(private logoutServ: logoutService = new logoutService()) { }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      const token: string[] = req.headers['authorization']?.split(' ') ?? [];

      if (!token) return res.status(400).json({ error: 'Error select' });
      await this.logoutServ.logout(token[1] ?? '')
      return res.json({ menssagem: 'Logout OK' });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
export { LoginController, LogoutController };
