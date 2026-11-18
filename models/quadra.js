import conexao from '../config/conexao.js';

const QuadraSchema = new conexao.Schema({
  usuario: { type: conexao.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  localizacao: { type: String, required: true, trim: true },
  tipo: { type: String, required: true, enum: ['coberta', 'aberta'] },
  valor: { type: Number, required: true, min: 0 },
  foto: { type: String, default: '' }
});

export default conexao.models.Quadra || conexao.model('Quadra', QuadraSchema);
