import { Database } from '../database/Database';

interface IgetUser {
    id?: string;
    nome?: string;
    email?: string;
    tipo?: string;
    descricao?: string;
    competencias?: string;
    experiencia?: string;
    ramo?: string;
}

interface IuserRepository {
    getUser(email: string, id: string): Promise<IgetUser>;
    insertUser(email: string, id: string): Promise<IgetUser>;
    updateUser(email: string, id: string): Promise<any>;
    deleteUser(email: string, id: string): Promise<any>;
}

class userRepository implements IuserRepository {
    /**
     * Esse construtor serve para injetar o banco de dados nessa classe
     */
    constructor(private db: Database = new Database()) { }

    async getUser(email: string, id: string): Promise<IgetUser> {
        const select = await this.db.findMore('usuario', '*', `IF(tipo = 1, 'empresa', 'candidato') as tipo`, { email: email, id: id });
        return select[0];
    }

    async insertUser(body: any): Promise<any> {
        return await this.db.create('usuario', body);
    }

    async updateUser(id: string, body: any): Promise<any> {
        return await this.db.update('usuario', body, 'id', { id: id });
    }

    async deleteUser(id: string): Promise<any> {
        return await this.db.delete('usuario', { id: id });
    }
}


export { userRepository };
