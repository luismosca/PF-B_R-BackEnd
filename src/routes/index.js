const { Router } = require('express');
const router = Router();
const sessionRouter = require('./sessionRouter.js');
const usersRouter = require('./usersRouter.js');
// Aquí debes proporcionar una función de middleware válida para cada ruta
router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/report', (req, res, next) => {
  // Tu middleware para /report
  next();
});

router.use('/donations', (req, res, next) => {
  // Tu middleware para /donations
  next();
});

module.exports = router;
