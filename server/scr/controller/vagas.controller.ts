import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../schemas/auth';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ZodError } from 'zod';
import { ErrorHandler } from '../handlers/errorHandler';
import { deleteVaga, insertVaga, upVaga, getVaga, getVagas } from '../services/cad';
import config from '../configs/config';
import db from '../knex';

export const vagasInsert = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const token: string | undefined = req.headers['authorization'];
    if (token) {
      console.log(token);
      const tokenParts = token.split(' ');
      let decoded: any;
      decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload
      let lista_token = await db('lista_token').select('id').where({
        email: decoded.email,
      });
      console.log(lista_token)
      if (!lista_token) return ErrorHandler.logoutError('error');
      const resp = await insertVaga(req.body, decoded.email);
      res.json(resp.response);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
}

export const vagasUp = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const token: string | undefined = req.headers['authorization'];

    console.log(req.headers);

    if (token) {
      const tokenParts = token.split(' ');
      let decoded: any;
      decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload
      let lista_token = await db('lista_token').select('id').where({
        email: decoded.email,
      });
      if (!lista_token) return ErrorHandler.logoutError('error');
      const resp = await upVaga(req.body, req.params.id_vaga);
      res.json(resp.response);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
}

export const vagasDelete = async (req: Request, res: Response) => {
  try {
    const token: string | undefined = req.headers['authorization'];
    console.log(req.headers);

    if (token) {
      const tokenParts = token.split(' ');
      let decoded: any;
      decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload
      let lista_token = await db('lista_token').select('id').where({
        email: decoded.email,
      });
      if (!lista_token) return ErrorHandler.logoutError('error');
      console.log(req.body);
      const resp = await deleteVaga(req.params.id_vaga);

      res.json(resp.response);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
}

export const vagaGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.headers['authorization'];

    if (token) {
      const tokenParts = token.split(' ');
      let decoded: any;
      decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload
      let lista_token = await db('lista_token').select('id').where({
        email: decoded.email,
      });
      console.log(req.headers);

      if (req.params.id_vaga) {
        const resp = await getVaga(req.params.id_vaga);
        res.json(resp.response);
      } else {
        const resp = await getVagas(decoded.email);
        res.json(resp.response);
      }
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return ErrorHandler.validationError(err, res);
    }
  }
}