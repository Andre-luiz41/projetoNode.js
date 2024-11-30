export const register = async (req, res) => {
  const { email, senha } = req.body;

  try {
      // Verificar se o usuário já existe
      const existingUsuario = await Usuario.findOne({ email });
      if (existingUsuario) {
          return res.status(400).json({ message: 'Usuário já existe.' });
      }

      // Criar um novo usuário
      const novoUsuario = new Usuario({ email, senha });

      // Salvar o usuário no banco de dados
      await novoUsuario.save();

      res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};
