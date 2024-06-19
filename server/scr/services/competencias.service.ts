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
