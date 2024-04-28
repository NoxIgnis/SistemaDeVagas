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
    return res.status(400).json({ error: errors });
  }

  static undefinedError(error: any, res: Response) {
    return res.status(500).json({ error: error.message });
  }

  static getError(error?: any, res?: Response) {
    if (res) {
      return res.status(701).json({ error: error });
    }
    return {
      statusCode: 701,
      error: error?.Code,
    };
  }

  static unauthorizedError(res?: Response) {
    if (res) {
      return res.status(401).json({ error: ['Credenciais inválidas!'] });
    }
    return {
      statusCode: 401,
      error: ['Credenciais inválidas!'],
    };
  }
}
