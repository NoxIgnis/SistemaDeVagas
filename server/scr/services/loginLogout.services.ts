/**
 * Esse classe é responsável por conter a lógica de negócio da aplicação
 * Ela utiliza o MessageRepository para realizar operações no banco de dados
 * Nessa classe por exemplo, são gerados os IDs, entre outros
 */

import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { loginRepository, logoutRepository } from '../repositories/loginLogout.repository';

interface ILoginService {
    login(login: {
        email: string,
        senha: string
    }): Promise<{ id: string, email: string, tipo: string } | void>;
    logado(): Promise<any>;
}
interface ILogoutService {
    logout(token: string): Promise<boolean>;
    logado(): Promise<any>;
}

class loginService implements ILoginService {
    constructor(
        private loginRep: loginRepository = new loginRepository()
    ) { }

    async login(login: {
        email: string,
        senha: string
    }): Promise<{ id: string, email: string, tipo: string } | void> {
        try {
            if (login) {
                return await this.loginRep.login(login);
            }
            return;
        } catch (err) {
            throw err;
        }
    }

    async insertToken(data: {
        token: string,
        email: string,
    }): Promise<{ id: string } | void> {
        try {
            if (data) {
                return await this.loginRep.token(data);
            }
            return;
        } catch (err) {
            throw err;
        }
    }

    async logado(): Promise<any> {
        try {
            return await this.loginRep.logados();
        } catch (err) {
            throw err;
        }
    }
}
class logoutService implements ILogoutService {
    constructor(
        private logoutRep: logoutRepository = new logoutRepository()
    ) { }

    async logout(token: string): Promise<boolean> {
        try {
            if (token) {
                const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload
                return await this.logoutRep.logout(token, decoded.email);
            }
            return false;
        } catch (err) {
            throw err;
        }
    }

    async logado(): Promise<any> {
        try {
            return await this.logoutRep.logados();
        } catch (err) {
            throw err;
        }
    }
}
export { loginService, logoutService };
