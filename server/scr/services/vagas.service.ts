/**
 * Esse classe é responsável por conter a lógica de negócio da aplicação
 * Ela utiliza o MessageRepository para realizar operações no banco de dados
 * Nessa classe por exemplo, são gerados os IDs, entre outros
 */

import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { vagasRepository } from '../repositories/vagas.repository';
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

interface IVagasService {
    getVaga(id: string): Promise<IVaga | void>;
    getVagas(token: string[]): Promise<IVagas | void>;
    insertVaga(token: string[], body: any): Promise<boolean>;
    updateVaga(token: string[], body: any): Promise<boolean>;
    deleteVaga(token: string[]): Promise<boolean>;
}

class vagasService implements IVagasService {
    /**
     * Esse construtor serve para injetar o repositório nessa classe
     * Caso não seja passado um repositório, ele usa por padrão o MessageRepository
     */
    constructor(
        private repository: vagasRepository = new vagasRepository(),
    ) { }

    async getVaga(id: string): Promise<IVaga | void> {
        try {
            if (id) {
                return await this.repository.getVaga(id);
            }
            return;
        } catch (err) {
            throw err;
        }
    }

    async getVagas(token: string[]): Promise<IVagas | void> {
        try {
            if (token) {
                const decoded = jwt.verify(token[1], config.jwt.secret) as JwtPayload
                return await this.repository.getVagas(decoded.email);
            }
            return;
        } catch (err) {
            throw err;
        }
    }

    async insertVaga(token: string[], body: any): Promise<boolean> {
        try {
            if (body) {
                const decoded = jwt.verify(token[1], config.jwt.secret) as JwtPayload
                body.empresa = decoded?.email
                const id = await this.repository.insertVaga(body);
                return id ? true : false;
            }
            return false;
        } catch (err) {
            throw err;
        }
    }

    async updateVaga(token: string[], body: any): Promise<boolean> {
        try {
            if (token && body) {
                const decoded = jwt.verify(token[1], config.jwt.secret) as JwtPayload
                const id = await this.repository.updateVaga(decoded.email, body);
                return id ? true : false;
            }
            return false;
        } catch (err) {
            throw err;
        }
    }

    async deleteVaga(token: string[]): Promise<boolean> {
        try {
            if (token) {
                const decoded = jwt.verify(token[1], config.jwt.secret) as JwtPayload
                const id = await this.repository.deleteVaga(decoded.id);
                return id ? true : false;

            }
            return false;
        } catch (err) {
            throw err;
        }
    }
}

export { vagasService };
