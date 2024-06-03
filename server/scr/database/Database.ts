/**
 * ESSA CLASSE É APENAS PARA SIMULAR UM ORM DE BANCO DE DADOS
 * Com o Prisma, não será necessário criar essa classe
 */

const tables: { [index: string]: any[] } = {
  message: [],
};

class Database {
  async create(table: string, data: any): Promise<any> {
    tables[table].push(data);
    return data;
  }

  async delete(table: string, id: string): Promise<void> {
    tables[table] = tables[table].filter((data) => data.id !== id);
  }

  async find(table: string, id: string): Promise<any> {
    return tables[table].find((data) => data.id === id);
  }

  async findAll(table: string): Promise<any[]> {
    return [...tables[table]];
  }

  async update(table: string, id: string, data: any): Promise<any> {
    const index = tables[table].findIndex((data) => data.id === id);
    tables[table][index] = data;
    return data;
  }
}

export { Database };
