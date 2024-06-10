import { Database } from '../database/Database';

interface ILoginRepository {
    login(login: {
        email: string,
        senha: string
    }): Promise<{ id: string, email: string, tipo: string }>;
}

interface ILogoutRepository {
    logout(token: string, email: string): Promise<boolean>;
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
        const select = await this.db.find('usuario', 'id, email, tipo', login);
        return select[0];
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
}

export { loginRepository, logoutRepository };
