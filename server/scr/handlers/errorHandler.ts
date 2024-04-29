import { Response } from 'express';

export class ErrorHandler extends Error {
  statusCode: number;
  messages: string[];
  constructor(statusCode: number, messages: string[]) {
    super();
    this.statusCode = statusCode;
    this.messages = messages;
  }

  static validationError(error: any, res: Response) {
    const errors: string[] = [];
    error.issues.map((issue: { message: string; path: string[] }) => {
      const path = issue.path[0];

      errors.push(`${path}: ${issue.message}`);
    });
    return res.status(422).json({ data: {error: errors }});
  }

  static undefinedError(error: any, res: Response) {
    return res.status(500).json({mensagem: error.message });
  }

  static logoutError(error?: any, res?: Response) {
    if (res) {
      return res.status(401).json({mensagem: error});
    }
    return {
      statusCode: 401,
      mensagem: error,
    };
  }

  static unauthorizedError(res?: Response) {
    if (res) {
      return res.status(422).json({mensagem: 'Senha ou Email inválido!' });
    }
    return {
      statusCode: 422,
      mensagem: 'Senha ou Email inválido!',
    };
  }
}
