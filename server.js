import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Importar o método fileURLToPath
import authRoutes from './src/routes/authRoutes.js';  // Caminho correto
import conectarDB from './src/utils/db.js';  // Caminho correto, agora que 'db.js' está dentro de 'src/utils'

dotenv.config();  // Carregar variáveis de ambiente

const app = express();

// Obter o diretório atual usando fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar ao banco de dados
conectarDB();

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analisar o corpo da requisição
app.use(express.json());  

// Usar as rotas de autenticação
app.use('/api/auth', authRoutes);  

// Inicializar o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000.'));
