import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../schemas/auth';
import { getCompetecias } from '../services/extras';
import { ZodError } from 'zod';
import { ErrorHandler } from '../handlers/errorHandler';

export const getCompetencias = async (req: Request, res: Response) => {
    try {
        const token : string | undefined = req.headers['authorization'];
        if(token){
          const decoded = await getCompetecias(token);
          res.json(decoded.response);
        }
      } catch (err) {
        if (err instanceof ZodError) {
          return ErrorHandler.validationError(err, res);
        }
    }
}