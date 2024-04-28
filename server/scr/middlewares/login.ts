import { NextFunction, Request, Response } from 'express';
// import { ErrorHandler } from '../handlers/errorHandler';
// import jwt, { JsonWebTokenError } from 'jsonwebtoken';
// import config from '../utils/config';
// import md5 from 'blueimp-md5';
// import db from '../knex';
// import { AuthenticateService } from '../services/auth';

// const authService = new AuthenticateService();
export const loginAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password)
    return res.status(400).json({
      message: 'email and password are required.',
    });

  try {
    // const authentication = await AuthenticateService(email, password);
    return res.json({});
  } catch (e: any) {
    return res.status(401).json({
      message: e.message,
    });
  }
};

export default loginAuth;
