import conexao from '../config/conexao.js';

const ReservaSchema = new conexao.Schema({
  usuario: { type: conexao.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  quadra: { type: conexao.Schema.Types.ObjectId, ref: 'Quadra', required: true },
  data: { type: Date, required: true },
  horario: { type: String, required: true }
}, { timestamps: true });

export default conexao.models.Reserva || conexao.model('Reserva', ReservaSchema);
