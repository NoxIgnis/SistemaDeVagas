/*
    Classe para validar os tokens das requests
*/

import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { authenticationService } from '../services/authentication.service';

interface IauthenticationController {
  validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

class authenticationController implements IauthenticationController {
  constructor(
    private authService: authenticationService = new authenticationService()
  ) {}

  async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const token: string[] = req.headers['authorization']?.split(' ') ?? [];
      if (!token) {
        return res.status(401).json({ menssagem: 'Token is required' });
      }
      if (!(await this.authService.validate(token?.[1] ?? ''))) {
        return res.status(401).json({ menssagem: 'Token Error' });
      }

      next();
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
export { authenticationController };
