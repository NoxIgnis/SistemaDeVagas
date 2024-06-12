import { Database } from '../database/Database';

interface IcompetenciasRepository {
    getCompetencia(): Promise<any>;
}

class competenciasRepository implements IcompetenciasRepository {
    /**
     * Esse construtor serve para injetar o banco de dados nessa classe
     */
    constructor(private db: Database = new Database()) { }

    async getCompetencia(): Promise<any> {
        return await this.db.findAll('competencias', '*');
    }
}

export { competenciasRepository };
