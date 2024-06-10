/**
 * Esse classe é responsável por conter a lógica de negócio da aplicação
 * Ela utiliza o MessageRepository para realizar operações no banco de dados
 * Nessa classe por exemplo, são gerados os IDs, entre outros
 */

import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { authenticationRepository } from '../repositories/authentication.repository';

interface IauthenticationService {
  validate(token: string): Promise<boolean>;
}

class authenticationService implements IauthenticationService {
  /**
   * Esse construtor serve para injetar o repositório nessa classe
   * Caso não seja passado um repositório, ele usa por padrão o MessageRepository
   */
  constructor(
    private authRepository: authenticationRepository = new authenticationRepository()
  ) { }

  async validate(token: string): Promise<boolean> {
    try {
      if (token) {
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload
        return await this.authRepository.authToken(token, decoded.email);
      }
      return false;
    } catch (err) {
      throw err;
    }
  }
}

export { authenticationService };
