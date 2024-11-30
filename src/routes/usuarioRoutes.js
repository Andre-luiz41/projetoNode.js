import express from 'express';
import upload from '../middleware/fileUpload.js';
import { criarUsuario } from '../controllers/postControllers.js';

const router = express.Router();

// Rota para criar usuário com upload de arquivo (foto de perfil)
router.post('/usuarios', upload.single('foto'), criarUsuario);

export default router;
