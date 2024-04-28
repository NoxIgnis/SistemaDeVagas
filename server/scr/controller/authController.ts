import { Request, Response } from 'express';
import { loginSchema } from '../schemas/auth';
import { authService } from '../services/auth';
import { ZodError } from 'zod';
import { ErrorHandler } from '../handlers/errorHandler';

export const loginController = async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);

    const authentication = await authService(body);

    if (authentication.error) {
      return res
        .status(authentication.statusCode!)
        .json({ error: authentication.error });
    }

    res.json(authentication);
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
};
