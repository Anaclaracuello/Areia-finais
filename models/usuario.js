import conexao from '../config/conexao.js';

const UsuarioSchema = new conexao.Schema({
  nome: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  telefone: { type: String, required: true, trim: true },
  senha: { type: String, required: true }
});

export default conexao.models.Usuario || conexao.model('Usuario', UsuarioSchema);
