import { Database } from '../database/Database';

interface IBuscarRepository {
    getUsuarios(): Promise<any>;
    // getUsuariosFiltrados(body: any): Promise<any>;
}

class BuscarRepository implements IBuscarRepository {
    /**
     * Esse construtor serve para injetar o banco de dados nessa classe
     */
    constructor(private db: Database = new Database()) { }

    async getUsuarios(): Promise<any> {
        return await this.db.findMore('usuario', '*', `IF(tipo = 1, 'empresa', 'candidato') as tipo`, { tipo: 0 });
    }

    // async getUsuariosFiltrados(body: any): Promise<any> {
    //     return await this.db.find('usuario', '*', { tipo: 0 });
    // }
}

export { BuscarRepository };
