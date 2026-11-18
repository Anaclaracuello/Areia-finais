import express from 'express';
import QuadraController from '../controllers/quadraController.js';

const router = express.Router();
const controle = new QuadraController();

router.get('/quadra/add', controle.openAdd);
router.post('/quadra/add', controle.add);
router.get('/quadra/lst', controle.list);
router.get('/quadra/edt/:id', controle.openEdt);
router.post('/quadra/edt/:id', controle.edt);
router.get('/quadra/del/:id', controle.del);

export default router;
