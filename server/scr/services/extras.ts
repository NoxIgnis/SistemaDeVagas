import { servicesResponseType } from '../types/response';
import bcrypt from 'bcrypt';
import md5 from 'blueimp-md5';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../configs/config';
import { ErrorHandler } from '../handlers/errorHandler';
import db from '../knex';
import { empresa, comp, User } from '../types/database';
interface ICompService {
    id: number;
    nome: string;
}[];

export const getCompetecias = async (token: string): Promise<servicesResponseType<ICompService>> => {
    try {
      const tokenParts = token.split(' ');
      let decoded: any;
      decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload  
      let lista_token = await db('lista_token').select('id').where({
        email: decoded.email,
      });
      if (!lista_token) return ErrorHandler.logoutError('error');

       const competencias = await db<comp>('competencias').select('*')
       let bodyReturn: comp[] = [];
       bodyReturn = competencias;
    //    competencias?.forEach((compe)=>{
    //     bodyReturn.push(compe)
    //    })

      return {
        response:bodyReturn
      };
  
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return ErrorHandler.logoutError('error');
      // Trate o erro adequadamente aqui
    }
  }