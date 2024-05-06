import { servicesResponseType } from '../types/response';
import bcrypt from 'bcrypt';
import md5 from 'blueimp-md5';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../configs/config';
import { ErrorHandler } from '../handlers/errorHandler';
import db from '../knex';
import { empresa, RequestDB, User } from '../types/database';

interface IAuthToken {
    mensage: string;
  }

export const insertUser = async (data: {
    email: string;
    senha: string;
    nome: string;
  }): Promise<servicesResponseType<IAuthToken>> => {
    // verifica se existe um email para usuario - padrao
    let id;
    const user = await db<User>('usuario').select('*').where({
      email: data.email,
    }).first();
    if (!user){
      // verifica se existe um email para empresas caso o usuario seja vazio
     id = await db('usuario').insert({nome: data.nome, email: data.email, senha: data.senha},['id']);
    };
    console.log(id)
  
    if (!id) return ErrorHandler.unauthorizedError();
      
    return {
        response:"Usuário cadastrado com sucesso"
      };
  };
  
  export const insertEmp = async (data: {
    email: string;
    senha: string;
    nome: string;
    ramo: string;
    descricao: string;
  }): Promise<servicesResponseType<IAuthToken>> => {
    // verifica se existe um email para usuario - padrao
    let id;
    const emp = await db<empresa>('empresas').select('*').where({
      email: data.email,
    }).first();
    console.log(emp)

    if (!emp){
    console.log(1515)

      // verifica se existe um email para empresas caso o usuario seja vazio
     id = await db('empresas').insert({nome: data.nome, email: data.email, senha: data.senha, ramo: data.ramo, descricao: data.descricao},['id']);
    };
    console.log(id)
  
    if (!id) return ErrorHandler.unauthorizedError();
      
    return {
        response:"Usuário cadastrado com sucesso"
      };
  };