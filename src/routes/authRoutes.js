import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';  // Certifique-se de que o caminho está correto

const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Buscar o usuário pelo email
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },  // Payload do token
      process.env.JWT_SECRET,  // Chave secreta do JWT
      { expiresIn: '1h' }  // Expiração do token (1 hora)
    );

    // Retornar o token
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota de registro (cadastro) de usuário
router.post('/register', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o email e a senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // Verificar se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    // Criar um novo usuário
    const novoUsuario = new Usuario({
      email,
      senha
    });

    // Criptografar a senha antes de salvar
    novoUsuario.senha = await bcrypt.hash(senha, 10); // Criptografa a senha com 10 rounds

    // Salvar o usuário no banco de dados
    await novoUsuario.save();

    // Responder com sucesso
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

export default router;
