/**
 * Esse classe é responsável por conter a lógica de negócio da aplicação
 * Ela utiliza o MessageRepository para realizar operações no banco de dados
 * Nessa classe por exemplo, são gerados os IDs, entre outros
 */

import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ramosRepository } from '../repositories/ramos.repository';
interface IRamoService {
    id: number;
    nome: string;
}[];

interface IRamosService {
    getRamos(): Promise<IRamoService>;
}



class RamosService implements IRamosService {
    /**
     * Esse construtor serve para injetar o repositório nessa classe
     * Caso não seja passado um repositório, ele usa por padrão o MessageRepository
     */
    constructor(
        private ramoRepository: ramosRepository = new ramosRepository()
    ) { }

    async getRamos(): Promise<IRamoService> {
        try {
            return await this.ramoRepository.getRamos();
        } catch (err) {
            throw err;
        }
    }
}

export { RamosService };
