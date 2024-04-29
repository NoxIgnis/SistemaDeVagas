import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import config from './configs/config';
import router from './routes';

const app = express();

// Configurações
dotenv.config();
app.use(
  cors({
    origin: '*',
    // methods: "POST",
  })
);

app.use(helmet());

app.use(express.json());
const __rootdir__ = process.cwd();

// Rotas
app.use(router);
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
