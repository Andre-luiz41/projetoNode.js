import { body, validationResult } from 'express-validator';

// Exemplo de criação de usuário com validação
export const criarUsuario = [
  // Validações
  body('nome').isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),

  // Validação no corpo da requisição
  (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    // Se não houver erros, crie o usuário
    // Aqui você pode adicionar sua lógica para salvar o usuário no banco
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  }
];
