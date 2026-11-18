import Usuario from '../models/usuario.js';

export default class UsuarioController {
  constructor() {
    this.openAdd = (req, res) => res.render('usuario/add');

    this.add = async (req, res, next) => {
      try {
        await Usuario.create(req.body);
        res.redirect('/usuario/lst');
      } catch (error) {
        next(error);
      }
    };

    this.list = async (req, res, next) => {
      try {
        res.render('usuario/lst', { Usuarios: await Usuario.find({}).sort('nome') });
      } catch (error) {
        next(error);
      }
    };

    this.find = async (req, res, next) => {
      try {
        const filtro = req.body.filtro?.trim() || '';
        const Usuarios = await Usuario.find({ nome: { $regex: filtro, $options: 'i' } }).sort('nome');
        res.render('usuario/lst', { Usuarios });
      } catch (error) {
        next(error);
      }
    };

    this.openEdt = async (req, res, next) => {
      try {
        const UsuarioEncontrado = await Usuario.findById(req.params.id);
        if (!UsuarioEncontrado) return res.status(404).send('Usuário não encontrado.');
        res.render('usuario/edt', { Usuario: UsuarioEncontrado });
      } catch (error) {
        next(error);
      }
    };

    this.edt = async (req, res, next) => {
      try {
        await Usuario.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        res.redirect('/usuario/lst');
      } catch (error) {
        next(error);
      }
    };

    this.del = async (req, res, next) => {
      try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.redirect('/usuario/lst');
      } catch (error) {
        next(error);
      }
    };
  }
}
