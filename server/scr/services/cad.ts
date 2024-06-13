import { servicesResponseType } from '../types/response';
import bcrypt from 'bcrypt';
import md5 from 'blueimp-md5';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../configs/config';
import { ErrorHandler } from '../handlers/errorHandler';
import db from '../knex';
import { empresa, RequestDB, User, vaga, Allvagas } from '../types/database';

interface IAuthToken {
  mensage: string;
}

interface IVaga {
  id: number;
  ramo_id: number;
  titulo: string;
  descricao: string;
  competencias: [
    {
      id: number;
      nome: string;
    }
  ];
  experiencia: number;
  salario_min: number;
  salario_max: number;
  ativo: boolean;
}

interface IVagas {
  id: number;
  ramo_id: number;
  titulo: string;
  descricao: string;
  competencias: [
    {
      id: number;
      nome: string;
    }
  ];
  experiencia: number;
  salario_min: number;
  salario_max: number;
  ativo: boolean;
  empresa_email: string;
}[]
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
  if (!user) {
    // verifica se existe um email para empresas caso o usuario seja vazio
    id = await db('usuario').insert({ nome: data.nome, email: data.email, senha: data.senha }, ['id']);
  };
  console.log(id)

  if (!id) return ErrorHandler.unauthorizedError();

  return {
    response: "Usuário cadastrado com sucesso"
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

  if (!emp) {
    console.log(1515)

    // verifica se existe um email para empresas caso o usuario seja vazio
    id = await db('empresas').insert({ nome: data.nome, email: data.email, senha: data.senha, ramo: data.ramo, descricao: data.descricao }, ['id']);
  };
  console.log(id)

  if (!id) return ErrorHandler.unauthorizedError();

  return {
    response: "Usuário cadastrado com sucesso"
  };
};

export const deleteUser = async (token: string): Promise<servicesResponseType<IAuthToken>> => {
  const tokenParts = token.split(' ');
  let delet: any;
  const decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload
  let lista_token = await db('lista_token').select('id').where({
    email: decoded.email,
  });
  if (!lista_token) return ErrorHandler.logoutError('error');
  await db('lista_token').delete().where('id', lista_token?.[0]?.id)

  if (decoded.tipo == 1) {
    delet = await db('empresas').delete().where({
      id: decoded.id,
    });
  } else {
    delet = await db('usuario').delete().where({
      id: decoded.id,
    });
  }

  if (!delet) return ErrorHandler.logoutError('delete fail');

  return {
    response: "Usuário Deletado com sucesso"
  };
}

export const insertVaga = async (data: {
  ramo_id: string;
  titulo: string;
  descricao: string;
  competencias: [
    {
      id: number;
      nome: string;
    }
  ] | string;
  experiencia: number;
  salario_min: number;
  salario_max: number;
  ativo: boolean;
  empresa_email?: string;
}, email: string): Promise<servicesResponseType<IAuthToken>> => {
  // verifica se existe um email para usuario - padrao
  let id;
  console.log(email);

  // const emp = await db<empresa>('empresa').select('*').where({
  //   email: email,
  // }).first();
  // console.log(emp);
  // if (!emp) {
  // verifica se existe um email para empresas caso o usuario seja vazio
  data.empresa_email = email;
  data.competencias = JSON.stringify(data.competencias ?? {});
  console.log(data);

  id = await db('vagas').insert(data, ['id']);
  // };
  console.log(id)

  if (!id) return ErrorHandler.unauthorizedError();

  return {
    response: "Usuário cadastrado com sucesso"
  };
};

export const upVaga = async (data: {
  id: number;
  ramo_id: number;
  titulo: string;
  descricao: string;
  competencias: [
    {
      id: number;
      nome: string;
    }
  ] | string;
  experiencia: number;
  salario_min: number;
  salario_max: number;
  ativo: boolean;
}, id_vaga: string): Promise<servicesResponseType<IAuthToken>> => {
  // verifica se existe um email para usuario - padrao
  let id;
  console.log(id_vaga)
  console.log(data)
  if (id_vaga) {
    data.competencias = JSON.stringify(data.competencias ?? {});
    id = await db('vagas').update(data, ['id']).where({
      id: id_vaga,
    });
  };
  console.log(id)

  if (!id) return ErrorHandler.unauthorizedError();

  return {
    response: "Usuário cadastrado com sucesso"
  };
};

export const deleteVaga = async (id_vaga: any): Promise<servicesResponseType<IAuthToken>> => {

  const delet = await db('vagas').delete().where({
    id: id_vaga,
  });
  if (!delet) return ErrorHandler.logoutError('delete fail');

  return {
    response: "Deletado com sucesso"
  };
}

export const getVaga = async (id_vaga: any): Promise<servicesResponseType<IVaga>> => {
  const vaga = await db<vaga>('vagas').select('*').where({
    id: id_vaga,
  });

  const bodyReturn: IVaga = vaga?.[0];

  return {
    response: bodyReturn
  };
}

export const getVagas = async (email: string): Promise<servicesResponseType<IVagas>> => {
  try {
    if (typeof email !== 'string') {
      throw new Error("Invalid token type");
    }
    let vagas: any = await db<Allvagas>('vagas').select('*').where({ empresa_email: email ?? '' });

    let bodyReturn: any = vagas;
    vagas.forEach((element: any, index: any) => {
      bodyReturn[index].competencias = JSON.parse(element.competencias)
    });

    return {
      response: bodyReturn
    };
  } catch (error) {
    // Handle error appropriately
    console.error("Error fetching vagas:", error);
    throw new Error("Failed to fetch vagas");
  }
}