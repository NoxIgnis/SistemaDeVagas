import { servicesResponseType } from '../types/response';
import bcrypt from 'bcrypt';
import md5 from 'blueimp-md5';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../configs/config';
import { ErrorHandler } from '../handlers/errorHandler';
import db from '../knex';
import { empresa, RequestDB, User } from '../types/database';
interface IAuthService {
  token: string;
}
interface IAuthToken {
  mensage: string;
}

interface IgetUser {
    nome?: string; 
    email?:string;
    tipo?: string;
    descricao?: string;
    competencias?: string;
    experiencia?: string;
    ramo?: string;
}

export const authService = async (data: {
  email: string;
  password: string;
}): Promise<servicesResponseType<IAuthService>> => {
  // verifica se existe um email para usuario - padrao
  let type: number = 0;
  let user = await db<User>('usuario').select('*').where({
    email: data.email,
  });
  
  if (!user){
    // verifica se existe um email para empresas caso o usuario seja vazio
    type = 1
    user = await db<User>('empresas').select('*').where({
      email: data.email,
    })
  };

  if (!user) return ErrorHandler.unauthorizedError();

  // const match = await bcrypt.compare(data.password, user[0].senha!);
  const match = data.password == user[0].senha;

  if (!match) return ErrorHandler.unauthorizedError();

  const error = await db<any>('lista_token').select('*').where({
    email: user[0].email,
  }).first();
  
  if(error !== undefined) return ErrorHandler.unauthorizedError();
  const payload = {
    email: user[0].email,
    versao: md5(`${user[0].id}-${user[0].email}-${user[0].senha}`),
    tipo: type
  };

  const token = {
    // data: {
      // token: '464864',
      token: jwt.sign(payload, config.jwt.secret,
      //    {
      //   expiresIn: config.jwt.expires,
      // }
      ),
    // },
  }

  if(token) await db('lista_token').insert({token: token.token, email: user[0].email});
  return token;
};

export const authToken = async (token: string): Promise<servicesResponseType<IAuthToken>> => {
  try {
      const tokenParts = token.split(' ');
      let decoded: any;
      decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload  
      let lista_token = await db('lista_token').select('id').where({
        email: decoded.email,
      });
     
      if (!lista_token) return ErrorHandler.logoutError('error');
      console.log(lista_token?.[0]?.id)
      await db('lista_token').delete().where('id', lista_token?.[0]?.id)
      return {"mensagem":"Sucesso"};
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return ErrorHandler.logoutError('error');
    // Trate o erro adequadamente aqui
  }
}

export const getUser = async (token: string): Promise<servicesResponseType<IgetUser>> => {
  try {
    const tokenParts = token.split(' ');
    let decoded: any;
    let user;
    let emp;
    decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload  
    let lista_token = await db('lista_token').select('id').where({
      email: decoded.email,
    });
    if (!lista_token) return ErrorHandler.logoutError('error');
    if(decoded.tipo == 1){
      emp = await db<empresa>('empresas').select('id','nome','email','ramo','descricao').where({
        email: decoded.email,
      });
    }else{
      user = await db<User>('usuario').select('id','nome','email','competencias','experiencias').where({
        email: decoded.email,
      });
    }

    const bodyReturn: IgetUser = {
      nome: user?.[0]?.nome ?? emp?.[0]?.nome, 
      email:user?.[0]?.email ?? emp?.[0]?.email, 
      tipo: decoded.tipo == 1 ? 'empresa' : 'candidato', 
    }
    if(decoded.tipo != 1 && user?.[0]?.competencias){
      bodyReturn.competencias = user?.[0]?.competencias;
    }
    if(decoded.tipo != 1 && user?.[0]?.experiencias){
      bodyReturn.experiencia = user?.[0]?.experiencias;
    }
    if(decoded.tipo != 1 && emp?.[0]?.descricao){
      bodyReturn.competencias = emp?.[0]?.descricao;
    }
    if(decoded.tipo != 1 && emp?.[0]?.ramo){
      bodyReturn.experiencia = emp?.[0]?.ramo;
    }
    return {
      response:bodyReturn
    };

  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return ErrorHandler.logoutError('error');
    // Trate o erro adequadamente aqui
  }
}

export const upUser = async (token: string , data: {
  email: string;
  nome: string;
  comp?: {
    id: number;
    nome: string;
  }[];
  exp?:{
    
  }
}): Promise<servicesResponseType<IgetUser>> => {
  try {
    const tokenParts = token.split(' ');
    let decoded: any;
    let user;
    let emp;
    decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload  
    let lista_token = await db('lista_token').select('id').where({
      email: decoded.email,
    });
    if (!lista_token) return ErrorHandler.logoutError('error');
    if(decoded.tipo == 1){
      emp = await db<empresa>('empresas').select('id','nome','email','ramo','descricao').where({
        email: decoded.email,
      });
    }else{
      user = await db<User>('usuario').select('id','nome','email','competencias','experiencias').where({
        email: decoded.email,
      });
    }

    const bodyReturn: IgetUser = {
      nome: user?.[0]?.nome ?? emp?.[0]?.nome, 
      email:user?.[0]?.email ?? emp?.[0]?.email, 
      tipo: decoded.tipo == 1 ? 'empresa' : 'candidato', 
    }
    if(decoded.tipo != 1 && user?.[0]?.competencias){
      bodyReturn.competencias = user?.[0]?.competencias;
    }
    if(decoded.tipo != 1 && user?.[0]?.experiencias){
      bodyReturn.experiencia = user?.[0]?.experiencias;
    }
    if(decoded.tipo != 1 && emp?.[0]?.descricao){
      bodyReturn.competencias = emp?.[0]?.descricao;
    }
    if(decoded.tipo != 1 && emp?.[0]?.ramo){
      bodyReturn.experiencia = emp?.[0]?.ramo;
    }
    return {
      response:bodyReturn
    };

  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return ErrorHandler.logoutError('error');
    // Trate o erro adequadamente aqui
  }
}
