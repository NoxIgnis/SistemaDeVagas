import { BuscarRepository } from '../repositories/buscar.repository';
interface IgetUser {
    id?: string;
    nome?: string;
    email?: string;
    tipo?: string;
    descricao?: string;
    competencias?: string;
    experiencia?: string;
    ramo?: string;
    vagas?: string;
}

interface IBuscarService {
    getUsuarios(): Promise<any>;
    getUsuariosFiltrados(): Promise<IgetUser>;
}

class BuscarService implements IBuscarService {
    /**
     * Esse construtor serve para injetar o repositório nessa classe
     * Caso não seja passado um repositório, ele usa por padrão o MessageRepository
     */
    constructor(
        private repository: BuscarRepository = new BuscarRepository()
    ) { }

    async getUsuarios(): Promise<any> {
        try {
            return await this.repository.getUsuarios();
        } catch (err) {
            throw err;
        }
    }

    async getUsuariosFiltrados(): Promise<IgetUser> {
        try {
            return await this.repository.getUsuarios();
        } catch (err) {
            throw err;
        }
    }
}

export { BuscarService };
