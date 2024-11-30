import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id; // Guarda o ID do usuário no request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

export default verificarToken;
