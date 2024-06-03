/*
    Classe para gerenciar login e logout
*/

import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

interface ILoginLogoutController {
  getAll(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
}

class LoginLogoutController implements ILoginLogoutController {
  constructor(private messageService: MessageService = new MessageService()) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const createdMessage = await this.messageService.create({ content });

      return res.json(createdMessage);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      await this.messageService.create({ content: 'Hello, World!' });
      const messages = await this.messageService.getAll();

      return res.json(messages);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
export { LoginLogoutController };
