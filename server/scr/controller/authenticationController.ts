/*
    Classe para validar os tokens das requests
*/

import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
// import { ErrorHandler } from '../handlers/errorHandler';
import { authenticationService } from '../services/authentication.service';

interface IauthenticationController {
  validate(req: Request, res: Response): Promise<Response>;
}

class authenticationController {
  constructor(private authService: authService = new authService()) {}

  async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const token = req.headers['authorization'];

      if (!token) {
        return res.status(401).json({ mensagem: 'Token is required' });
      }

      this.authService.validate();

      next();
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      await this.authService.create({ content: 'Hello, World!' });
      const messages = await this.authService.getAll();

      return res.json(messages);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
