// src/routes/serverRoutes.js
import express from 'express';
import { criarUsuario } from '../controllers/postControllers.js';  // Ajuste o caminho se necessário

const router = express.Router();

router.post('/usuarios', criarUsuario);  // Rota para criar usuário

export default router;
