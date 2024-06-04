/**
 * Esse classe é responsável por conter a lógica de negócio da aplicação
 * Ela utiliza o MessageRepository para realizar operações no banco de dados
 * Nessa classe por exemplo, são gerados os IDs, entre outros
 */

// import { Message } from '../models/message.model';
import { MessageRepository } from '../repositories/authentication.repository';

interface IauthenticationService {
  validate({ id }: { id: string }): Promise<void>;
}

class authenticationService implements IauthenticationService {
  /**
   * Esse construtor serve para injetar o repositório nessa classe
   * Caso não seja passado um repositório, ele usa por padrão o MessageRepository
   */
  constructor(
    private messageRepository: MessageRepository = new MessageRepository()
  ) {}

  async validate({ id }: { id: string }): Promise<void> {
    try {
      await this.messageRepository.delete({ id });
      // const tokenParts = token.split(' ');
      // let decoded: any;
      // decoded = jwt.verify(tokenParts[1], config.jwt.secret) as JwtPayload
      // let lista_token = await db('lista_token').select('id').where({
      //   email: decoded.email,
      // });
      return;
    } catch (err) {
      throw err;
    }
  }
}

export { authenticationService };
