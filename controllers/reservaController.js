import Reserva from '../models/reserva.js';
import Usuario from '../models/usuario.js';
import Quadra from '../models/quadra.js';

export default class ReservaController {
  constructor() {
    this.openAdd = async (req, res, next) => {
      try {
        const [Usuarios, Quadras] = await Promise.all([Usuario.find({}).sort('nome'), Quadra.find({}).sort('localizacao')]);
        res.render('reservas/add', { Usuarios, Quadras });
      } catch (error) {
        next(error);
      }
    };

    this.add = async (req, res, next) => {
      try {
        const existente = await Reserva.exists({ quadra: req.body.quadra, data: new Date(req.body.data), horario: req.body.horario });
        if (existente) return res.status(409).send('Esta quadra já está reservada nesse horário.');
        await Reserva.create(req.body);
        res.redirect('/reserva/lst');
      } catch (error) {
        next(error);
      }
    };

    this.list = async (req, res, next) => {
      try {
        res.render('reservas/lst', { Reservas: await Reserva.find({}).populate('usuario').populate('quadra').sort({ data: 1, horario: 1 }) });
      } catch (error) {
        next(error);
      }
    };

    this.find = async (req, res, next) => {
      try {
        const filtro = req.body.filtro?.trim() || '';
        const usuarios = await Usuario.find({ nome: { $regex: filtro, $options: 'i' } }).select('_id');
        const Reservas = await Reserva.find({ usuario: { $in: usuarios.map((usuario) => usuario._id) } }).populate('usuario').populate('quadra').sort({ data: 1, horario: 1 });
        res.render('reservas/lst', { Reservas });
      } catch (error) {
        next(error);
      }
    };

    this.del = async (req, res, next) => {
      try {
        await Reserva.findByIdAndDelete(req.params.id);
        res.redirect('/reserva/lst');
      } catch (error) {
        next(error);
      }
    };
  }
}
