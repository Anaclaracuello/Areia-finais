import Quadra from '../models/quadra.js';
import Reserva from '../models/reserva.js';
import Usuario from '../models/usuario.js';

export default class SiteController {
  constructor() {
    this.home = (req, res) => res.render('index', { paginaAtiva: 'inicio' });

    this.quadras = async (req, res, next) => {
      try {
        const Quadras = await Quadra.find({}).sort('localizacao');
        res.render('site/quadras', { Quadras, paginaAtiva: 'quadras' });
      } catch (error) { next(error); }
    };

    this.reservas = async (req, res, next) => {
      try {
        const filtro = req.query.email?.trim();
        let usuario = null;
        let Reservas = [];
        if (filtro) {
          usuario = await Usuario.findOne({ email: filtro });
          if (usuario) {
            Reservas = await Reserva.find({ usuario: usuario._id })
              .populate('quadra').sort({ data: 1, horario: 1 });
          }
        }
        res.render('site/reservas', { Reservas, usuario, email: filtro || '', paginaAtiva: 'reservas' });
      } catch (error) { next(error); }
    };

    this.novaReserva = async (req, res, next) => {
      try {
        const [Quadras, Usuarios] = await Promise.all([
          Quadra.find({}).sort('localizacao'),
          Usuario.find({}).sort('nome')
        ]);
        res.render('site/nova-reserva', { Quadras, Usuarios, paginaAtiva: 'reservas' });
      } catch (error) { next(error); }
    };

    this.usuario = (req, res) => res.redirect('/usuario/add');

    this.login = (req, res) => res.render('site/login', { paginaAtiva: 'login' });
  }
}
