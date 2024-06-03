import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../schemas/auth';
import { getCompetecias } from '../services/extras';
import { ZodError } from 'zod';
import { ErrorHandler } from '../handlers/errorHandler';
import { deleteUser, insertEmp, insertUser } from '../services/cad';

export const getCompetencias = async (req: Request, res: Response) => {
    try {
      console.log(123312)
        const token : string | undefined = req.headers['authorization'];

        console.log(req.headers);

        if(token){
          const decoded = await getCompetecias(token);
          console.log(decoded )
          res.json(decoded.response);
        }
      } catch (err) {
        if (err instanceof ZodError) {
          return ErrorHandler.validationError(err, res);
        }
    }
}

export const userController = async (req: Request, res: Response) => {
  try {
        console.log(req.body);
        console.log(15);
        const resp = await insertUser(req.body);

        res.json(resp.response);
      
    } catch (err) {
      if (err instanceof ZodError) {
        return ErrorHandler.validationError(err, res);
      }
  }
}

export const empController = async (req: Request, res: Response) => {
  try {
        console.log(req.body);
        const resp = await insertEmp(req.body);

        res.json(resp.response);
      
    } catch (err) {
      if (err instanceof ZodError) {
        return ErrorHandler.validationError(err, res);
      }
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  try {
      console.log(req.body);
      const token : string | undefined = req.headers['authorization'];

      const resp = await deleteUser(token ?? '');

      res.json(resp.response);
    
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
}