import Quadra from '../models/quadra.js';
import Usuario from '../models/usuario.js';

export default class QuadraController {
  constructor() {
    this.openAdd = async (req, res, next) => {
      try {
        res.render('quadra/add', { Usuarios: await Usuario.find({}).sort('nome') });
      } catch (error) {
        next(error);
      }
    };

    this.add = async (req, res, next) => {
      try {
        await Quadra.create({ ...req.body, foto: req.body.foto || '' });
        res.redirect('/quadra/lst');
      } catch (error) {
        next(error);
      }
    };

    this.list = async (req, res, next) => {
      try {
        res.render('quadra/lst', { Quadras: await Quadra.find({}).populate('usuario').sort('localizacao') });
      } catch (error) {
        next(error);
      }
    };

    this.openEdt = async (req, res, next) => {
      try {
        const QuadraEncontrada = await Quadra.findById(req.params.id);
        if (!QuadraEncontrada) return res.status(404).send('Quadra não encontrada.');
        res.render('quadra/edt', { Quadra: QuadraEncontrada, Usuarios: await Usuario.find({}).sort('nome') });
      } catch (error) {
        next(error);
      }
    };

    this.edt = async (req, res, next) => {
      try {
        await Quadra.findByIdAndUpdate(req.params.id, { ...req.body, foto: req.body.foto || '' }, { runValidators: true });
        res.redirect('/quadra/lst');
      } catch (error) {
        next(error);
      }
    };

    this.del = async (req, res, next) => {
      try {
        await Quadra.findByIdAndDelete(req.params.id);
        res.redirect('/quadra/lst');
      } catch (error) {
        next(error);
      }
    };
  }
}
