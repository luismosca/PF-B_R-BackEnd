const { Router } = require('express');
const reportsRouter = require('./reportsRouter');
const router = Router();
const sessionRouter = require('./sessionRouter.js')
// Aquí debes proporcionar una función de middleware válida para cada ruta
router.use('/session', sessionRouter);

router.use('/users', (req, res, next) => {
  // Tu middleware para /users
  next();
});

router.use('/reports', reportsRouter);

router.use('/donations', (req, res, next) => {
  // Tu middleware para /donations
  next();
});

module.exports = router;