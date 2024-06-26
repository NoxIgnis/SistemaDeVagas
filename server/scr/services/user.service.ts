/**
 * Esse classe é responsável por conter a lógica de negócio da aplicação
 * Ela utiliza o MessageRepository para realizar operações no banco de dados
 * Nessa classe por exemplo, são gerados os IDs, entre outros
 */

import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { logoutRepository } from '../repositories/loginLogout.repository';
import { ErrorHandler } from '../handlers/errorHandler';
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

interface IuserService {
    getUser(token: string[]): Promise<IgetUser | void>;
    insertUser(body: any): Promise<boolean>;
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

    async insertUser(body: any): Promise<boolean> {
        try {
            if (body) {
                const id = await this.userRep.insertUser(body);
                return id ? true : false;
            }
            return false;
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

    async insertMensagem(token: string, body: any): Promise<boolean> {
        try {
            if (body) {
                const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
                let insert: boolean = false;
                body.candidatos.forEach(async (cand: any) => {
                    const body_insert: {
                        candidato: string,
                        empresa: string,
                        mensagem: string
                    } = {
                        candidato: cand,
                        empresa: decoded.email,
                        mensagem: `Gostaria que entrasse em contato pelo email ${decoded.email}`

                    };
                    console.log(body_insert)
                    const id = await this.userRep.insertMensagem(body_insert);
                    insert = id ? true : false;
                    if (!insert) {
                        return false;
                    }
                });

            }
            return false;
        } catch (err) {
            throw err;
        }
    }
}

export { userService };
