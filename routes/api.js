const apiRouter = require('express').Router();
const topicsRouter = require('./topics');
const articlesRouter = require('./articles');
const usersRouter = require('./users');

const getRoutes = require('../controllers/api');
const { handle405 } = require('../errors');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/users', usersRouter);

apiRouter
  .route('/')
  .get(getRoutes)
  .all(handle405);

module.exports = apiRouter;
