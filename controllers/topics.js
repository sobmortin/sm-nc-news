const {
  fetchTopics,
  addTopics,
  fetchArticlesByTopic,
  countArticlesByTopic,
} = require('../db/models/topics');

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
  let queriesObject = req.query;
  if (typeof +req.query.limit === 'string') queriesObject = { limit: 10 };
  return Promise.all([
    fetchArticlesByTopic(topicParam, queriesObject),
    countArticlesByTopic(topicParam),
  ])
    .then(([articles, total_count]) => {
      const total_articles = total_count[0].total_count;
      if (+total_articles === 0) {
        next({ status: 404, message: 'no articles found' });
      } else res.status(200).send({ total_articles, articles });
    })
    .catch(next);
};

module.exports = { getTopics, postTopics, getArticlesByTopic };
