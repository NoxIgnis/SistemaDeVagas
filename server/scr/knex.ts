import config from './configs/config';
import knex from 'knex';
export default knex(config.knex);
