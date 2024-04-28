import { servicesResponseType } from '../types/response';
import bcrypt from 'bcrypt';
import md5 from 'blueimp-md5';
import jwt from 'jsonwebtoken';
import config from '../configs/config';
import { ErrorHandler } from '../handlers/errorHandler';
import db from '../knex';
import { RequestDB, User } from '../types/database';
interface IAuthService {
  token: string;
}

export const authService = async (data: {
  email: string;
  password: string;
}): Promise<servicesResponseType<IAuthService>> => {
  const user = await db<User>('use_usuario').select('*').where({
    email: data.email,
  });

  if (!user) return ErrorHandler.unauthorizedError();

  const match = await bcrypt.compare(data.password, user[0].senha!);

  if (!match) return ErrorHandler.unauthorizedError();

  const payload = {
    email: user[0].email,
    versao: md5(`${user[0].usuario_id}-${user[0].email}-${user[0].senha}`),
  };

  return {
    data: {
      // token: '464864',
      token: jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expires,
      }),
    },
  };
};
