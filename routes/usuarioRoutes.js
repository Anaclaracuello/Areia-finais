import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const router = express.Router();
const controle = new UsuarioController();

router.get('/usuario/add', controle.openAdd);
router.post('/usuario/add', controle.add);
router.get('/usuario/lst', controle.list);
router.post('/usuario/lst', controle.find);
router.get('/usuario/edt/:id', controle.openEdt);
router.post('/usuario/edt/:id', controle.edt);
router.get('/usuario/del/:id', controle.del);

export default router;
