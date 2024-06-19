import { Database } from '../database/Database';

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

interface IVagasRepository {
    getVaga(email: string, id: string): Promise<IVaga>;
    getVagas(email: string, id: string): Promise<IVagas>;
    insertVaga(email: string, id: string): Promise<IVaga>;
    updateVaga(email: string, id: string): Promise<any>;
    deleteVaga(email: string, id: string): Promise<any>;
}

class vagasRepository implements IVagasRepository {
    /**
     * Esse construtor serve para injetar o banco de dados nessa classe
     */
    constructor(private db: Database = new Database()) { }

    async getVaga(id: string): Promise<IVaga> {
        const select = await this.db.find('vagas', '*', { id: id });
        return select[0];
    }

    async getVagas(where: any): Promise<IVagas> {
        return await this.db.findAll('vagas', '*');
    }

    async insertVaga(body: any): Promise<any> {
        return await this.db.create('vagas', body);
    }

    async updateVaga(id: string, body: any): Promise<any> {
        return await this.db.update('vagas', body, 'id', { id: id });
    }

    async deleteVaga(id: string): Promise<any> {
        return await this.db.delete('vagas', { id: id });
    }
}


export { vagasRepository };
