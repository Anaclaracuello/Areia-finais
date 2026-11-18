import express from 'express';
const router = express.Router();

router.get('/teste', (req, res) => res.send('Rota de teste funcionando.'));
router.post('/formulario', (req, res) => res.redirect('/'));

export default router;
