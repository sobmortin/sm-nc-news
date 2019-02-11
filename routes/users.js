const usersRouter = require('express').Router();
const {
  getUsers,
  getUserByUsername,
  getArticlesByUser,
  postUser,
} = require('../controllers/users');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser);

usersRouter.route('/:username').get(getUserByUsername);

usersRouter.route('/:username/articles').get(getArticlesByUser);

module.exports = usersRouter;
