import { Database } from '../database/Database';

interface IauthenticationRepository {
  authToken(token: string, email: string): Promise<boolean>;
}

class authenticationRepository implements IauthenticationRepository {
  /**
   * Esse construtor serve para injetar o banco de dados nessa classe
   */
  constructor(private db: Database = new Database()) { }

  async authToken(token: string, email: string): Promise<boolean> {
    const select = await this.db.find('lista_token', 'id', { email: email, token: token });
    return select ? true : false;
  }
}

export { authenticationRepository };
