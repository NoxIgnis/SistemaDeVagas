/**
 * CLASSE DESTINADA A REALIZAR CONSULTAS EXTERNAS
 * Ex.: Utilizar diretamente o banco de dados, APIs, etc.
 */

import { Database } from '../database/Database';
// import { Message } from '../models/message.model';

// Interface com os métodos para a Classe
interface IauthenticationRepository {
  //   create({ id, content }: { id: string; content: string }): Promise<Message>;
  //   delete({ id }: { id: string }): Promise<void>;
  //   getAll(): Promise<Message[]>;
}

class authenticationRepository implements IauthenticationRepository {
  /**
   * Esse construtor serve para injetar o banco de dados nessa classe
   */
  constructor(private db: Database = new Database()) {}

  //   async getAll(): Promise<Message[]> {
  //     const messages = await this.db.findAll('message');

  //     return messages;
  //   }

  //   async create({
  //     id,
  //     content,
  //   }: {
  //     id: string;
  //     content: string;
  //   }): Promise<Message> {
  //     const messageData = new Message({ id, content });
  //     const createdMessage = await this.db.create('message', messageData);

  //     if (!createdMessage) throw new Error('Erro ao criar mensagem');

  //     return createdMessage;
  //   }

  //   async delete({ id }: { id: string }): Promise<void> {
  //     await this.db.delete('message', id);

  //     return;
  //   }
}

export { authenticationRepository };
