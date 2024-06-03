/*
    Classe para validar os tokens das requests
*/

import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

interface IauthenticationController {
  getAll(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
}

class authenticationController {
  constructor(private authService: authService = new authService()) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const createdMessage = await this.authService.create({ content });

      return res.json(createdMessage);
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
