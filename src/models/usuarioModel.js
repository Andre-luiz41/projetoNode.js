import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

// Antes de salvar o usuário, criptografar a senha
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();

  // Criptografar a senha com bcrypt
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

// Método para comparar a senha (usado no login)
usuarioSchema.methods.comparePassword = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
