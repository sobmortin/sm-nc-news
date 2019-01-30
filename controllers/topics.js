const { fetchTopics, addTopics, fetchArticlesByTopic } = require('../db/models/topics');

const getTopics = (req, res, next) => fetchTopics()
  .then((topics) => {
    res.status(200).send({ topics });
  })
  .catch(next);

const postTopics = (req, res, next) => {
  addTopics(req.body)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};

const getArticlesByTopic = (req, res, next) => {
  const topicParam = req.params.topic;
  const queriesObject = req.query;
  fetchArticlesByTopic(topicParam, queriesObject)
    .then((articles) => {
      const total_count = articles.length;
      if (!total_count) next({ status: 404, message: 'no articles found' });
      else res.status(200).send({ total_count, articles });
    })
    .catch(next);
};

module.exports = { getTopics, postTopics, getArticlesByTopic };
