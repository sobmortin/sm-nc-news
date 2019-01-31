const usersRouter = require('express').Router();
const { getUsers, getUserByUsername, getArticlesByUser } = require('../controllers/users');

usersRouter.route('/').get(getUsers);
usersRouter.route('/:username').get(getUserByUsername);
usersRouter.route('/:username/articles').get(getArticlesByUser);

module.exports = usersRouter;
