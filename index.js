import express from 'express';
import { webcrypto } from 'node:crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import quadraRoutes from './routes/quadraRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import { connectDatabase } from './config/conexao.js';

// Compatibilidade com versões do driver MongoDB que esperam crypto global.
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Servir arquivos estáticos
app.use(express.static(join(__dirname, 'public')));
app.set('views', join(__dirname, 'views'));

// Rotas
app.use(routes);
app.use(usuarioRoutes);
app.use(quadraRoutes);
app.use(reservaRoutes);
app.use(siteRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  if (
    error.name === 'MongooseError' ||
    error.name === 'MongooseServerSelectionError' ||
    error.message.includes('before initial connection')
  ) {
    return res.status(503).send('Banco de dados indisponível. Configure MONGODB_URI no arquivo .env e reinicie o servidor.');
  }
  res.status(500).send('Ocorreu um erro ao processar a solicitação.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

connectDatabase();

// Exporta o handler compatível com Vercel
export default app;
