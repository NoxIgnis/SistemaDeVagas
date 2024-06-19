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
    insertVaga(body: any): Promise<IVaga>;
    updateVaga(email: string, body: any): Promise<any>;
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

    async getVagas(email: string): Promise<IVagas> {
        if (email) { return await this.db.find('vagas', '*', { empresa: email }); }
        else { return await this.db.find('vagas', '*', { ativo: 1 }); }
    }

    async insertVaga(body: any): Promise<any> {
        return await this.db.create('vagas', body);
    }

    async updateVaga(email: string, body: any): Promise<any> {
        return await this.db.update('vagas', body, 'id', { empresa: email });
    }

    async deleteVaga(id: string): Promise<any> {
        return await this.db.delete('vagas', { id: id });
    }
}


export { vagasRepository };
