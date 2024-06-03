import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../schemas/auth';
import { authService, authToken, getUser, upUser } from '../services/auth';
import { ZodError } from 'zod';
import { ErrorHandler } from '../handlers/errorHandler';

export const loginController = async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);
    console.log(body);
    const authentication = await authService(body);

    if (authentication.mensagem) {
      return res
        .status(authentication.statusCode!)
        .json({ mensagem: authentication.mensagem });
    }

    res.json(authentication);
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    console.log(req.headers);
    const token: string | undefined = req.headers['authorization'];
    console.log(token);
    if (token) {
      const decoded = await authToken(token);
      console.log(decoded);

      res.json(decoded);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers['authorization'];
    if (token) {
      const decoded = await getUser(token);
      res.json(decoded.response);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
};

export const upUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers['authorization'];
    if (token) {
      console.log(req.body);

      // const body = putSchema.parse(req.body);
      const decoded = await upUser(token, req.body);

      res.json(decoded.response);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
};
