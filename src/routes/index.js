const { Router } = require('express');
const reportsRouter = require('./reportsRouter');
const router = Router();

// Aquí debes proporcionar una función de middleware válida para cada ruta
router.use('/session', (req, res, next) => {
  // Tu middleware para /session
  next();
});

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