import dotenv from 'dotenv';
import path from 'path';
const envPath = path.resolve(__dirname, '../../../.env');

dotenv.config({ path: envPath });

export default {
  port: getEnv('PORT_START'),
  knex: {
    client: 'pg',
    connection: {
      host: getEnv('DB_HOST'),
      port: parseInt(getEnv('DB_PORT')),
      user: getEnv('DB_USER'),
      password: getEnv('DB_PASS'),
      database: getEnv('DB_DATABASE'),
      ssl: { rejectUnauthorized: false },
    },
  },
  jwt:{
    secret: getEnv('JWT_SECRET_KEY'),
    expires: getEnv('JWT_EXPIRE')
  }
};

function getEnv(name: string): string {
  const temp = process.env[name];
  if (temp) {
    return temp;
  } else {
    console.log(`ERRO AO SOLICITAR ${name}`);
    return '';
  }
}
