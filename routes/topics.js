const topicsRouter = require('express').Router();
const {
  getTopics,
  postTopics,
  getArticlesByTopic,
  postArticleByTopic,
} = require('../controllers/topics');

topicsRouter
  .route('/')
  .get(getTopics)
  .post(postTopics);

topicsRouter
  .route('/:topic/articles')
  .get(getArticlesByTopic)
  .post(postArticleByTopic);

module.exports = topicsRouter;
