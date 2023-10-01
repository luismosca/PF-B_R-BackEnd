const { Router } = require('express');
const commentsAdminRouter = require('./commentsAdminRouter');
const reportsAdminRouter = require('./reportsAdminRouters');
const usersAdminRouter = require('./usersAdminRouter');
const adminRouter = Router();


adminRouter.use('/Comments', commentsAdminRouter);
adminRouter.use('/Reports', reportsAdminRouter);
adminRouter.use('/Users', usersAdminRouter);

module.exports = adminRouter;


