import { Database } from '../database/Database';

interface IRamoRepository {
    getRamos(): Promise<any>;
}

class ramosRepository implements IRamoRepository {
    /**
     * Esse construtor serve para injetar o banco de dados nessa classe
     */
    constructor(private db: Database = new Database()) { }

    async getRamos(): Promise<any> {
        return await this.db.findAll('ramos', '*');
    }
}

export { ramosRepository };
