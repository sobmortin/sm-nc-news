const topicsRouter = require('express').Router();
const {
  getTopics,
  postTopics,
  getArticlesByTopic,
  postArticleByTopic,
} = require('../controllers/topics');
const { handle405 } = require('../errors');

topicsRouter
  .route('/')
  .get(getTopics)
  .post(postTopics)
  .all(handle405);

topicsRouter
  .route('/:topic/articles')
  .get(getArticlesByTopic)
  .post(postArticleByTopic)
  .all(handle405);

module.exports = topicsRouter;
