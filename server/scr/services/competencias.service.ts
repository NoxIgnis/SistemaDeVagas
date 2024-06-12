/**
 * Esse classe é responsável por conter a lógica de negócio da aplicação
 * Ela utiliza o MessageRepository para realizar operações no banco de dados
 * Nessa classe por exemplo, são gerados os IDs, entre outros
 */

import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { competenciasRepository } from '../repositories/competencia.repository';
interface ICompService {
    id: number;
    nome: string;
}[];

interface IcompetenciaService {
    getCompetencias(): Promise<ICompService>;
}



class competenciaService implements IcompetenciaService {
    /**
     * Esse construtor serve para injetar o repositório nessa classe
     * Caso não seja passado um repositório, ele usa por padrão o MessageRepository
     */
    constructor(
        private compRepository: competenciasRepository = new competenciasRepository()
    ) { }

    async getCompetencias(): Promise<ICompService> {
        try {
            return await this.compRepository.getCompetencia();
        } catch (err) {
            throw err;
        }
    }
}

export { competenciaService };
