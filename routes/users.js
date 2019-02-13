const usersRouter = require('express').Router();
const { handle405 } = require('../errors');
const {
  getUsers,
  getUserByUsername,
  getArticlesByUser,
  postUser,
} = require('../controllers/users');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser)
  .all(handle405);

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all(handle405);

usersRouter
  .route('/:username/articles')
  .get(getArticlesByUser)
  .all(handle405);

module.exports = usersRouter;
