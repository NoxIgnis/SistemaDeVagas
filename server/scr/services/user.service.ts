/**
 * Esse classe é responsável por conter a lógica de negócio da aplicação
 * Ela utiliza o MessageRepository para realizar operações no banco de dados
 * Nessa classe por exemplo, são gerados os IDs, entre outros
 */

import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { logoutRepository } from '../repositories/loginLogout.repository';
interface IgetUser {
    id?: string;
    nome?: string;
    email?: string;
    tipo?: string;
    descricao?: string;
    competencias?: string;
    experiencia?: string;
    ramo?: string;
}

interface IuserService {
    getUser(token: string[]): Promise<IgetUser | void>;
    updateUser(token: string[], body: any): Promise<boolean>;
}

class userService implements IuserService {
    /**
     * Esse construtor serve para injetar o repositório nessa classe
     * Caso não seja passado um repositório, ele usa por padrão o MessageRepository
     */
    constructor(
        private userRep: userRepository = new userRepository(),
        private logoutRep: logoutRepository = new logoutRepository()
    ) { }

    async getUser(token: string[]): Promise<IgetUser | void> {
        try {
            if (token) {
                const decoded = jwt.verify(token[1], config.jwt.secret) as JwtPayload
                return await this.userRep.getUser(decoded.email, decoded.id);
            }
            return;
        } catch (err) {
            throw err;
        }
    }

    async updateUser(token: string[], body: any): Promise<boolean> {
        try {
            if (token && body) {
                const decoded = jwt.verify(token[1], config.jwt.secret) as JwtPayload
                const id = await this.userRep.updateUser(decoded.id, body);
                return id ? true : false;
            }
            return false;
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(token: string[]): Promise<IgetUser | void> {
        try {
            if (token) {
                const decoded = jwt.verify(token[1], config.jwt.secret) as JwtPayload
                await this.logoutRep.logout(token[1], decoded.email);
                return await this.userRep.deleteUser(decoded.id);
            }
            return;
        } catch (err) {
            throw err;
        }
    }
}

export { userService };
