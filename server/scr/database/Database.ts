/**
 * ESSA CLASSE É APENAS PARA SIMULAR UM ORM DE BANCO DE DADOS
 * Com o Prisma, não será necessário criar essa classe
 */
import db from '../knex';

const tables: { [index: string]: any[] } = {
  mensagem: [],
};

class Database {
  async create(table: string, data: any): Promise<any> {
    return await db(table).insert(data, ['id']);
  }

  async delete(table: string, where: any): Promise<any> {
    return await db(table).delete().where(where);
  }

  async find(table: string, select: string, where: any): Promise<any> {
    return await db(table).select(select).where(where)
  }

  async findMore(table: string, select: string, select2: string, where: any): Promise<any> {
    return await db(table).select(select, db.raw(select2)).where(where)
  }

  async findAll(table: string, select: string): Promise<any> {
    return await db(table).select(select);
  }

  async update(table: string, data: any, returned: string, where: any): Promise<any> {
    return await db(table).update(data, [returned]).where(where)
  }
}

export { Database };
