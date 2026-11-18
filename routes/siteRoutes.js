import express from 'express';
import SiteController from '../controllers/siteController.js';

const router = express.Router();
const controle = new SiteController();

router.get('/', controle.home);
router.get('/site/quadras', controle.quadras);
router.get('/site/reservas', controle.reservas);
router.get('/site/nova-reserva', controle.novaReserva);
router.get('/site/usuario', controle.usuario);
router.get('/site/login', controle.login);

export default router;
