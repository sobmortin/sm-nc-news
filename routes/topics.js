const topicsRouter = require('express').Router();
const { getTopics, postTopics, getArticlesByTopic } = require('../controllers/topics');

topicsRouter
  .route('/')
  .get(getTopics)
  .post(postTopics);

topicsRouter.route('/:topic/articles').get(getArticlesByTopic);


module.exports = topicsRouter;
