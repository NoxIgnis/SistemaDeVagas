import { Database } from '../database/Database';

interface ILoginRepository {
    login(login: {
        email: string,
        senha: string
    }): Promise<{ id: string, email: string, tipo: string }>;
    logados(): Promise<any>;
}

interface ILogoutRepository {
    logout(token: string, email: string): Promise<boolean>;
    logados(): Promise<any>;
}

class loginRepository implements ILoginRepository {
    /**
     * Esse construtor serve para injetar o banco de dados nessa classe
     */
    constructor(private db: Database = new Database()) { }

    async login(login: {
        email: string,
        senha: string
    }): Promise<{ id: string, email: string, tipo: string }> {
        const select = await this.db.find('usuario', '*', login);
        return select[0];
    }
    async token(data: {
        token: string,
        email: string,
    }): Promise<{ id: string, email: string, tipo: string }> {
        return await this.db.create('lista_token', data);
    }
    async logados(): Promise<any> {
        return await this.db.findAll('lista_token', '*');
    }
}

class logoutRepository implements ILogoutRepository {
    /**
     * Esse construtor serve para injetar o banco de dados nessa classe
     */
    constructor(private db: Database = new Database()) { }

    async logout(token: string, email: string): Promise<boolean> {
        const delet = await this.db.delete('lista_token', { token: token, email: email });
        return delet ? true : false;
    }
    async logados(): Promise<any> {
        return await this.db.findAll('lista_token', '*');
    }
}

export { loginRepository, logoutRepository };
